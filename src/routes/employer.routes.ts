import express from "express";
import { employerController } from "../controllers/employer.controller";

const router = express.Router();

router.post("/register", employerController.createEmployer);
router.post("/:id/setup-api", employerController.setupApiIntegration);
router.get("/:id/tiers", employerController.getEmployerTiers);

export default router;
