// Thin entry in front of the static assets.
// Its only job is to 301 www.vinibrasil.com → the apex (vinibrasil.com),
// keeping the apex canonical (matches `SITE` in astro.config.mjs).
// Every other request is handed straight to the static asset server.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.vinibrasil.com") {
      url.hostname = "vinibrasil.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
