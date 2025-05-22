import { Request, Response } from 'express';
import { User } from '../models/User';
import { Employer } from '../models/Employer';
import { AdvanceRequest } from '../models/AdvanceRequest';

export const employeeController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findByPk(userId, {
        attributes: ['id', 'email', 'role', 'walletAddress'],
        include: [{
          model: Employer,
          as: 'employer',
          attributes: ['id', 'companyName', 'verificationStatus']
        }]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching employee profile:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  },

  async getAdvanceRequests(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const requests = await AdvanceRequest.findAll({
        where: { employeeId: userId },
        order: [['createdAt', 'DESC']]
      });

      res.json(requests);
    } catch (error) {
      console.error('Error fetching advance requests:', error);
      res.status(500).json({ message: 'Error fetching advance requests' });
    }
  },

  async createAdvanceRequest(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { amount, reason } = req.body;

      const request = await AdvanceRequest.create({
        employeeId: userId,
        amount,
        reason,
        status: 'PENDING'
      });

      res.status(201).json(request);
    } catch (error) {
      console.error('Error creating advance request:', error);
      res.status(500).json({ message: 'Error creating advance request' });
    }
  }
}; 