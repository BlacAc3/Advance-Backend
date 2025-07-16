// public/swagger-init.js
window.onload = function () {
  // Begin Swagger UI call
  const ui = SwaggerUIBundle({
    url: "/swagger.json", // Or your API endpoint that serves the spec
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
  });
  window.ui = ui;
};
