import { Employer } from '../models/Employer';
import { User } from '../models/User';
import { Employee } from '../models/Employee';
import { logger } from '../utils/logger';
import { Op } from 'sequelize';
import { DemoRequest, DemoRequestAttributes } from '../models/DemoRequest';
import { ApiError } from '../utils/ApiError';

export class EmployerService {
  // Create or update employer profile
  static async createOrUpdateEmployer(userId: string, data: any) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.role !== 'EMPLOYER') {
        throw new Error('User is not an employer');
      }

      const [employer, created] = await Employer.findOrCreate({
        where: { userId },
        defaults: {
          ...data,
          isVerified: false
        }
      });

      if (!created) {
        await employer.update(data);
      }

      return employer;
    } catch (error) {
      logger.error('Employer profile update error:', error);
      throw error;
    }
  }

  // Get employer profile
  static async getEmployerProfile(userId: string) {
    try {
      const employer = await Employer.findOne({
        where: { userId },
        include: [{
          model: User,
          attributes: ['email', 'role', 'isActive', 'lastLoginAt']
        }]
      });

      if (!employer) {
        throw new Error('Employer profile not found');
      }

      return employer;
    } catch (error) {
      logger.error('Get employer profile error:', error);
      throw error;
    }
  }

  // Get employer's employees
  static async getEmployerEmployees(userId: string, page = 1, limit = 10) {
    try {
      const employer = await Employer.findOne({ where: { userId } });
      if (!employer) {
        throw new Error('Employer not found');
      }

      const offset = (page - 1) * limit;
      const { count, rows: employees } = await Employee.findAndCountAll({
        where: { employerId: employer.id },
        include: [{
          model: User,
          attributes: ['email', 'isActive', 'lastLoginAt']
        }],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });

      return {
        employees,
        total: count,
        page,
        totalPages: Math.ceil(count / limit)
      };
    } catch (error) {
      logger.error('Get employer employees error:', error);
      throw error;
    }
  }

  // Add new employee
  static async addEmployee(userId: string, employeeData: any) {
    try {
      const employer = await Employer.findOne({ where: { userId } });
      if (!employer) {
        throw new Error('Employer not found');
      }

      // Check if employee email already exists
      const existingUser = await User.findOne({
        where: { email: employeeData.email }
      });

      if (existingUser) {
        throw new Error('Employee email already registered');
      }

      // Create user account for employee
      const user = await User.create({
        email: employeeData.email,
        password: employeeData.password, // Note: Password should be hashed in the controller
        role: 'EMPLOYEE',
        isActive: true
      });

      // Create employee profile
      const employee = await Employee.create({
        userId: user.id,
        employerId: employer.id,
        salary: employeeData.salary,
        payFrequency: employeeData.payFrequency,
        nextPayDate: employeeData.nextPayDate,
        employmentStartDate: employeeData.employmentStartDate,
        isApproved: true // Auto-approve if added by employer
      });

      return employee;
    } catch (error) {
      logger.error('Add employee error:', error);
      throw error;
    }
  }

  // Update employee details
  static async updateEmployee(userId: string, employeeId: string, data: any) {
    try {
      const employer = await Employer.findOne({ where: { userId } });
      if (!employer) {
        throw new Error('Employer not found');
      }

      const employee = await Employee.findOne({
        where: {
          id: employeeId,
          employerId: employer.id
        }
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      await employee.update(data);
      return employee;
    } catch (error) {
      logger.error('Update employee error:', error);
      throw error;
    }
  }

  // Remove employee
  static async removeEmployee(userId: string, employeeId: string) {
    try {
      const employer = await Employer.findOne({ where: { userId } });
      if (!employer) {
        throw new Error('Employer not found');
      }

      const employee = await Employee.findOne({
        where: {
          id: employeeId,
          employerId: employer.id
        }
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      // Set employment end date
      await employee.update({
        employmentEndDate: new Date(),
        isApproved: false
      });

      // Deactivate user account
      const user = await User.findByPk(employee.userId);
      if (user) {
        await user.update({ isActive: false });
      }

      return true;
    } catch (error) {
      logger.error('Remove employee error:', error);
      throw error;
    }
  }

  // Get employer verification status
  static async getVerificationStatus(userId: string) {
    try {
      const employer = await Employer.findOne({ where: { userId } });
      if (!employer) {
        throw new Error('Employer not found');
      }

      return {
        isVerified: employer.isVerified,
        verificationDocuments: employer.verificationDocuments,
        verificationDate: employer.updatedAt
      };
    } catch (error) {
      logger.error('Get verification status error:', error);
      throw error;
    }
  }

  // Submit verification documents
  static async submitVerificationDocuments(userId: string, documents: any) {
    try {
      const employer = await Employer.findOne({ where: { userId } });
      if (!employer) {
        throw new Error('Employer not found');
      }

      await employer.update({
        verificationDocuments: documents,
        isVerified: false // Reset verification status when new documents are submitted
      });

      return employer;
    } catch (error) {
      logger.error('Submit verification documents error:', error);
      throw error;
    }
  }

  async createDemoRequest(data: Omit<DemoRequestAttributes, 'id' | 'createdAt' | 'updatedAt'>): Promise<DemoRequest> {
    try {
      const demoRequest = await DemoRequest.create(data);
      return demoRequest;
    } catch (error) {
      throw new ApiError(500, 'Failed to create demo request');
    }
  }

  async getDemoRequest(id: number): Promise<DemoRequest> {
    try {
      const demoRequest = await DemoRequest.findByPk(id);
      if (!demoRequest) {
        throw new ApiError(404, 'Demo request not found');
      }
      return demoRequest;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch demo request');
    }
  }

  async updateDemoRequestStatus(
    id: number,
    status: DemoRequestAttributes['status'],
    notes?: string,
    scheduledDate?: Date
  ): Promise<DemoRequest> {
    try {
      const demoRequest = await this.getDemoRequest(id);
      await demoRequest.update({
        status,
        notes: notes || demoRequest.notes,
        scheduledDate: scheduledDate || demoRequest.scheduledDate
      });
      return demoRequest;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to update demo request status');
    }
  }

  async listDemoRequests(
    page: number = 1,
    limit: number = 10,
    status?: DemoRequestAttributes['status']
  ): Promise<{ rows: DemoRequest[]; count: number }> {
    try {
      const where = status ? { status } : {};
      const { rows, count } = await DemoRequest.findAndCountAll({
        where,
        order: [['createdAt', 'DESC']],
        limit,
        offset: (page - 1) * limit
      });
      return { rows, count };
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch demo requests');
    }
  }
} 