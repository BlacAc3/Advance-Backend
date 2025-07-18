import express from "express";
import { marketerController } from "../controllers/marketer.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

const router = express.Router();

router.get(
  "/invites",
  authenticate,
  authorize([UserRole.MARKETER]),
  marketerController.get_invites,
);

router.post(
  "/send-invite",
  authenticate,
  authorize([UserRole.MARKETER]),
  marketerController.sendInvite,
);

export default router;
