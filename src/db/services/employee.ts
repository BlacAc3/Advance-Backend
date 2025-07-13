import "dotenv/config";
import { prisma } from "../database";
import { EnumEmployeesKycStage, EnumEmployeesKycStatus } from "../../generated/prisma";

class EmployeeService {
  async get(data: { id?: string; userId?: string }) {
    const { id, userId } = data;

    if (id) {
      return await prisma.employee.findUnique({
        where: { id },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
    } else if (userId) {
      return await prisma.employee.findUnique({
        where: { userId },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
    } else {
      throw new Error("Either id or userId must be provided");
    }
  }

  async create(data: {
    userId: string;
    employerId: string;
    kycStage?: EnumEmployeesKycStage;
    kycStatus?: EnumEmployeesKycStatus;
    kycSubmittedAt?: Date;
    kycReviewedAt?: Date;
    kycReviewerId?: string;
    kycNotes?: string;
    salary?: number;
    registrationDate: Date;
  }) {
    return await prisma.employee.create({
      data,
      include: {
        user: true,
        employer: true,
        kycReviewer: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{
      kycStage: EnumEmployeesKycStage;
      kycStatus: EnumEmployeesKycStatus;
      kycSubmittedAt: Date;
      kycReviewedAt: Date;
      kycReviewerId: string;
      kycNotes: string;
      salary: number;
    }>,
  ) {
    return await prisma.employee.update({
      where: { id },
      data,
      include: {
        user: true,
        employer: true,
        kycReviewer: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.employee.delete({
      where: { id },
    });
  }

  async getAll() {
    return await prisma.employee.findMany({
      include: {
        user: true,
        employer: true,
        kycReviewer: true,
      },
    });
  }

  async getByEmployerId(employerId: string) {
    return await prisma.employee.findMany({
      where: { employerId },
      include: {
        user: true,
        employer: true,
        kycReviewer: true,
      },
    });
  }
}

const employeeService = new EmployeeService();
export default employeeService;
