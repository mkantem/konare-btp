(function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = document.querySelector(".theme-toggle-label");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (window.REMARK42 && typeof window.REMARK42.changeTheme === "function") {
      window.REMARK42.changeTheme(theme);
    }

    if (themeToggle && themeLabel) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeLabel.textContent = isDark ? "Mode clair" : "Mode sombre";
    }
  }

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function loadTikTokScript() {
    const hasTikTokScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');

    if (hasTikTokScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }

  function getTikTokEmbed(url) {
    const match = url.match(/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)(?:[/?#].*)?$/);

    if (!match) {
      return null;
    }

    const embed = document.createElement("blockquote");
    embed.className = "tiktok-embed";
    embed.cite = url;
    embed.dataset.videoId = match[1];
    embed.style.maxWidth = "605px";
    embed.style.minWidth = "325px";
    embed.appendChild(document.createElement("section"));
    return embed;
  }

  async function renderTikTokVideos() {
    const containers = document.querySelectorAll("[data-tiktok-videos]");

    if (!containers.length) {
      return;
    }

    try {
      const response = await fetch("../content/tiktok-videos.json");

      if (!response.ok) {
        throw new Error("TikTok video list could not be loaded.");
      }

      const data = await response.json();
      const videos = Array.isArray(data.videos) ? data.videos : [];
      const embeds = videos
        .filter(function (video) {
          return video && video.enabled !== false && typeof video.url === "string";
        })
        .reverse()
        .map(function (video) {
          return getTikTokEmbed(video.url);
        })
        .filter(Boolean);

      containers.forEach(function (container) {
        const limit = Number.parseInt(container.dataset.tiktokLimit, 10) || embeds.length;
        container.replaceChildren.apply(container, embeds.slice(0, limit).map(function (embed) {
          return embed.cloneNode(true);
        }));

        if (!container.children.length) {
          container.textContent = container.dataset.tiktokEmpty || "No videos available.";
        }
      });

      if (embeds.length) {
        loadTikTokScript();
      }
    } catch (error) {
      containers.forEach(function (container) {
        container.textContent = container.dataset.tiktokError || "Videos could not be loaded.";
      });
    }
  }

  renderTikTokVideos();
})();
