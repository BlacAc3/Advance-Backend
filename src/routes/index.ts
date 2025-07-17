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
  // An endpoint to serve your swagger.json or openapi.yaml
  app.get("/docs/swagger.json", (req, res) => {
    res.sendFile(path.join(__dirname, "../swagger-output.json"));
  });
  app.get("/docs/swagger", (req, res) => {
    // You can redirect to an external URL or another route within your application.
    // For example, redirecting to Google:
    res.redirect("https://advance-backend-docs.vercel.app/docs/swagger/");

    res.redirect(301, "https://www.new-domain.com/permanent-redirect-path");
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
