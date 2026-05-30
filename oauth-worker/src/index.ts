interface Env {
  CMS_ORIGIN: string;
  GITHUB_OAUTH_ID: string;
  GITHUB_OAUTH_SECRET: string;
  GITHUB_REPO_PRIVATE?: string;
}

const STATE_COOKIE = "konarebtp_decap_oauth_state";

function randomHex(bytes: number): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get("Cookie") || "";

  for (const cookie of cookies.split(";")) {
    const [key, ...value] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

function getCallbackUrl(url: URL): string {
  return `${url.origin}/callback?provider=github`;
}

function callbackResponse(
  env: Env,
  status: "success" | "error",
  payload: Record<string, string>
): Response {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const body = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Authorisation Decap CMS</title>
  </head>
  <body>
    <p>Authorisation Decap CMS en cours...</p>
    <script>
      const receiveMessage = () => {
        window.opener.postMessage(${JSON.stringify(message)}, ${JSON.stringify(env.CMS_ORIGIN)});
        window.removeEventListener("message", receiveMessage, false);
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", ${JSON.stringify(env.CMS_ORIGIN)});
    </script>
  </body>
</html>`;

  return new Response(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
      "Set-Cookie": `${STATE_COOKIE}=; Path=/callback; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

function handleAuth(url: URL, env: Env): Response {
  if (url.searchParams.get("provider") !== "github") {
    return new Response("Invalid provider", { status: 400 });
  }

  const state = randomHex(16);
  const scope = env.GITHUB_REPO_PRIVATE === "1" ? "repo,user" : "public_repo,user";
  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.search = new URLSearchParams({
    client_id: env.GITHUB_OAUTH_ID,
    redirect_uri: getCallbackUrl(url),
    response_type: "code",
    scope,
    state,
  }).toString();

  return new Response(null, {
    status: 302,
    headers: {
      Location: githubUrl.toString(),
      "Set-Cookie": `${STATE_COOKIE}=${encodeURIComponent(state)}; Path=/callback; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function handleCallback(request: Request, url: URL, env: Env): Promise<Response> {
  if (url.searchParams.get("provider") !== "github") {
    return new Response("Invalid provider", { status: 400 });
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = getCookie(request, STATE_COOKIE);

  if (!code || !state || !expectedState || state !== expectedState) {
    return callbackResponse(env, "error", { error: "Invalid OAuth callback" });
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_ID,
      client_secret: env.GITHUB_OAUTH_SECRET,
      code,
      redirect_uri: getCallbackUrl(url),
    }),
  });
  const payload = (await response.json()) as {
    access_token?: string;
    error_description?: string;
  };

  if (!response.ok || !payload.access_token) {
    return callbackResponse(env, "error", {
      error: payload.error_description || "GitHub token exchange failed",
    });
  }

  return callbackResponse(env, "success", { token: payload.access_token });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(request, url, env);
    }

    return new Response("KONARE BTP Decap CMS OAuth proxy");
  },
};
