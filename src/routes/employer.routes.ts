import express from "express";
import { employerController } from "../controllers/employer.controller";

const router = express.Router();

router.post("/register", employerController.employerRegister);
router.post("/:id/setup-api", employerController.setupApiIntegration);
router.get("/:id/tiers", employerController.getEmployerTiers);
router.post("/send-invite", employerController.sendInvite);

export default router;
