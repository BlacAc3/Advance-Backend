import { Express } from "express";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import employerRoutes from "./employer.routes";
import marketerRoutes from "./marketer.routes";
import adminRoutes from "./admin.routes";
import { employerController } from "../controllers/employer.controller";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

export const setupRoutes = (app: Express) => {
  // const apiPrefix = `/api/${process.env.API_VERSION || "v1"}`;
  // Serve Swagger documentation
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
      documentation: `${req.protocol}://${req.get("host")}/docs`,
    });
  });
};
