import { Invitation } from "../models";
import { Op } from "sequelize";

// Function to create an invitation
async function createInvitation(
  targetEmail: string,
  senderUserId: string,
  role: "EMPLOYER" | "EMPLOYEE",
  expiresAt: Date,
) {
  try {
    const invitation = await Invitation.create({
      targetEmail,
      senderUserId,
      role,
      expiresAt,
    });
    return invitation;
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw error;
  }
}

async function acceptInvitation(invitationId: string, recipientUserId: string) {
  try {
    const invitation = await Invitation.findOne({
      where: { invitationId: invitationId, status: "pending" },
    });

    if (!invitation) {
      throw new Error("Invalid or expired invitation");
    }

    // Update the invitation status and recipient
    invitation.status = "accepted";
    invitation.recipientUserId = recipientUserId;
    await invitation.save();

    // Potentially create an Employer or Employee record here, based on the invitation.role.
    // This part depends on your application logic.  For example:
    if (invitation.role === "employer") {
      // Create employer record (example, adjust fields as needed):
      //  const employer = await Employer.create({
      //   userId: recipientUserId,
      //   companyName: "Example Company",
      //   companyId: "Example123",
      //   registrationDate: new Date(),
      //   isVerified: false,
      //  });
    } else if (invitation.role === "employee") {
      //Create employee record
      //const employee = await Employee.create({
      //  userId: recipientUserId,
      //  employerId: employerId, //Define this value
      //  registrationDate: new Date()
      //})
    }
    return invitation;
  } catch (error) {
    console.error("Error accepting invitation:", error);
    throw error;
  }
}

// Function to reject an invitation
async function rejectInvitation(invitationId: string) {
  try {
    const invitation = await Invitation.findOne({
      where: { invitationId: invitationId, status: "pending" },
    });

    if (!invitation) {
      throw new Error("Invalid or expired invitation");
    }

    invitation.status = "rejected";
    await invitation.save();

    return invitation;
  } catch (error) {
    console.error("Error rejecting invitation:", error);
    throw error;
  }
}

// Function to expire invitations (e.g., run as a cron job)
async function expireInvitations() {
  try {
    const expiredInvitations = await Invitation.update(
      { status: "expired" },
      {
        where: {
          expiresAt: { [Op.lt]: new Date() },
          status: "pending",
        },
      },
    );

    console.log(`Expired ${expiredInvitations[0]} invitations`);
  } catch (error) {
    console.error("Error expiring invitations:", error);
    throw error;
  }
}

export { createInvitation, rejectInvitation, acceptInvitation };
