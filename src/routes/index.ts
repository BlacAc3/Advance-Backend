import { Express } from "express";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import employerRoutes from "./employer.routes";
import marketerRoutes from "./marketer.routes";
import adminRoutes from "./admin.routes";
import { employerController } from "../controllers/employer.controller";
import path from "path";

export const setupRoutes = (app: Express) => {
  // const apiPrefix = `/api/${process.env.API_VERSION || "v1"}`;
  // Serve Swagger documentation
  app.get("/api-docs", (req, res) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; " +
        "script-src 'self' https://cdn.jsdelivr.net; " + // Allow scripts from self and cdn.jsdelivr.net
        "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline';" + // Allow styles from self and cdn.jsdelivr.net, and inline styles for swagger-ui.css
        "img-src 'self' data:;", // Often needed for swagger-ui logos, etc.
    );
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>My API Documentation</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
        <script src="public/swagger-init.js"></script> </body>
        </body>
      </html>
    `);
  });

  // An endpoint to serve your swagger.json or openapi.yaml
  app.get("/swagger.json", (req, res) => {
    res.sendFile(path.join(__dirname, "swagger-output.json")); // Or res.json(yourSwaggerSpecObject);
  });
  // API routes
  app.use(`/api/v1/auth`, authRoutes);
  app.use(`/api/v1/employee`, employeeRoutes);
  app.use(`/api/v1/employer`, employerRoutes);
  app.use(`/api/v1/marketer`, marketerRoutes);
  app.use("/api/v1/admin", adminRoutes);

  // Root route
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to AdvancePay API",
      version: process.env.API_VERSION || "v1",
      documentation: `${req.protocol}://${req.get("host")}/api-docs`,
    });
  });
};
