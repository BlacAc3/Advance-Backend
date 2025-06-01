import { Express } from "express";
import authRoutes from "./auth.routes";
// import { employerRoutes } from "./employer.routes";
// import { employeeRoutes } from "./employee.routes";
// import { web3Routes } from "./web3.routes";
// import { adminRoutes } from "./admin.routes";
import { healthCheckRoutes } from "./health.routes";

export const setupRoutes = (app: Express) => {
  const apiPrefix = `/api/${process.env.API_VERSION || "v1"}`;

  // Health check route
  app.use(`${apiPrefix}/health`, healthCheckRoutes);

  // API routes
  app.use(`${apiPrefix}/auth`, authRoutes);
  // app.use(`${apiPrefix}/employer`, employerRoutes);
  // app.use(`${apiPrefix}/employee`, employeeRoutes);
  // app.use(`${apiPrefix}/web3`, web3Routes);
  // app.use(`${apiPrefix}/admin`, adminRoutes);

  // Root route
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to AdvancePay API",
      version: process.env.API_VERSION || "v1",
      documentation: `${req.protocol}://${req.get("host")}/api-docs`,
    });
  });
};
