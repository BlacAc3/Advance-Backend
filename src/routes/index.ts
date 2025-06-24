import { Express } from "express";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import employerRoutes from "./employer.routes";
import marketerRoutes from "./marketer.routes";
import { healthCheckRoutes } from "./health.routes";
// import { employerRoutes } from "./employer.routes";
// import { web3Routes } from "./web3.routes";
// import { adminRoutes } from "./admin.routes";

export const setupRoutes = (app: Express) => {
  const apiPrefix = `/api/${process.env.API_VERSION || "v1"}`;

  // Health check route
  app.use(`/api/v1/health`, healthCheckRoutes);

  // API routes
  app.use(`/api/v1/auth`, authRoutes);
  app.use(`/api/v1/employee`, employeeRoutes);
  app.use(`/api/v1/employer`, employerRoutes);
  app.use(`/api/v1/marketer`, marketerRoutes);

  // Root route
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to AdvancePay API",
      version: process.env.API_VERSION || "v1",
      documentation: `${req.protocol}://${req.get("host")}/api-docs`,
    });
  });
};
