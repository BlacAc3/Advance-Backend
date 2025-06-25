import express from "express";
import { employerController } from "../controllers/employer.controller";
import { marketerController } from "../controllers/marketer.controller";

const router = express.Router();

router.post("/register", employerController.employerRegister);
router.post("/:id/setup-api", employerController.setupApiIntegration);
router.get("/:id/tiers", employerController.getEmployerTiers);

export default router;
