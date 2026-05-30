(function () {
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const locale = document.documentElement.lang === "fr" ? "fr" : "en";

  window.remark_config = {
    host: "https://comments.mkante.ml",
    site_id: "konarebtp",
    url: "https://konarebtp.ml/reviews",
    page_title: "Avis clients | Client reviews",
    locale: locale,
    theme: theme,
    no_footer: true,
    components: ["embed"]
  };

  const script = document.createElement("script");
  const supportsModules = "noModule" in script;
  script.type = supportsModules ? "module" : "text/javascript";
  script.src = window.remark_config.host + "/web/embed" + (supportsModules ? ".mjs" : ".js");
  script.defer = true;
  document.head.appendChild(script);
})();
