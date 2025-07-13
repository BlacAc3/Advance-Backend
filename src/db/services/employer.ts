import "dotenv/config";
import { prisma } from "../database";

class EmployerService {
  async get(data: { id?: string; companyName?: string }) {
    const { id, companyName } = data;
    if (!id && !companyName) {
      throw new Error("Either id or companyName must be provided");
      return;
    }

    if (id) {
      return await prisma.employer.findUnique({
        where: { id },
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
    } else if (companyName) {
      return await prisma.employer.findUnique({
        where: { companyName },
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
    }
    return;
  }

  async create(data: {
    userId: string;
    marketerId?: number;
    companyName: string;
    registrationDate: Date;
    isVerified?: boolean;
    verificationDate?: Date;
    verifiedBy?: string;
  }) {
    return await prisma.employer.create({
      data,
      include: {
        user: true,
        marketer: true,
        verifiedByUser: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{
      marketerId: number;
      companyName: string;
      isVerified: boolean;
      verificationDate: Date;
      verifiedBy: string;
    }>,
  ) {
    return await prisma.employer.update({
      where: { id },
      data,
      include: {
        user: true,
        marketer: true,
        verifiedByUser: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.employer.delete({
      where: { id },
    });
  }

  async getAll() {
    return await prisma.employer.findMany({
      include: {
        user: true,
        marketer: true,
        verifiedByUser: true,
      },
    });
  }
}

const employerService = new EmployerService();
export default employerService;
