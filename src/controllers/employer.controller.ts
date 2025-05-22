import { Request, Response } from 'express';
import { EmployerService } from '../services/employerService';
import { ApiError } from '../utils/ApiError';
import { sendEmail } from '../utils/emailService';

export class EmployerController {
  private employerService: EmployerService;

  constructor() {
    this.employerService = new EmployerService();
  }

  requestDemo = async (req: Request, res: Response) => {
    try {
      const {
        companyName,
        contactName,
        email,
        phone,
        companySize,
        message
      } = req.body;

      // Store the demo request in the database
      const demoRequest = await this.employerService.createDemoRequest({
        companyName,
        contactName,
        email,
        phone,
        companySize: parseInt(companySize),
        message,
        status: 'PENDING'
      });

      // Send confirmation email to the employer
      await sendEmail({
        to: email,
        subject: 'Demo Request Received - AdvancePay',
        template: 'demo-request-confirmation',
        data: {
          contactName,
          companyName
        }
      });

      // Send notification to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Demo Request',
        template: 'demo-request-notification',
        data: {
          contactName,
          companyName,
          email,
          phone,
          companySize,
          message
        }
      });

      res.status(201).json({
        success: true,
        message: 'Demo request submitted successfully',
        data: {
          id: demoRequest.id,
          status: demoRequest.status
        }
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to process demo request');
    }
  };

  // ... other controller methods ...
} 