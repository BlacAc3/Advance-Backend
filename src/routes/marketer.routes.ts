import express from "express";
import { marketerController } from "../controllers/marketer.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

const router = express.Router();

router.post(
  "/invite",
  authenticate,
  authorize([UserRole.MARKETER]),
  marketerController.sendInvite,
);
router.get(
  "/invitations",
  authenticate,
  authorize([UserRole.MARKETER]),
  marketerController.get_invites,
);

export default router;
