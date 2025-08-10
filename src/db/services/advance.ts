import "dotenv/config";
import { prisma } from "../database";
import { EnumAdvancesStatus } from "../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

interface CreateAdvanceData {
  employeeId: string;
  employerId: string;
  amount: Decimal;
  serviceFee: Decimal;
  serviceFeePercentage: Decimal;
  netAmount: Decimal;
  repaymentAmount: Decimal;
  earnedToDate: Decimal;
  availableAdvance: Decimal;
  requestDate: Date;
  dueDate: Date;
  repaymentDate?: Date;
  status: EnumAdvancesStatus;
  poolUtilizationAtRequest?: Decimal;
  riskScore?: number;
  approvalDate?: Date;
  approvedBy?: string;
}

interface UpdateAdvanceData {
  status?: EnumAdvancesStatus;
  approvalDate?: Date;
  approvedBy?: string;
  disbursementDate?: Date;
  paymentDate?: Date;
  repaymentDate?: Date;
  rejectedBy?: string;
  rejectionReason?: string;
  transactionHash?: string;
  repaymentTransactionHash?: string;
}

class AdvanceService {
  async get(data: { id?: string; employeeId?: string; employerId?: string }) {
    const { id, employeeId, employerId } = data;

    if (id) {
      return await prisma.advance.findUnique({
        where: { id },
        include: {
          employee: {
            include: {
              user: true,
              employer: true,
            },
          },
        },
      });
    } else if (employeeId) {
      return await prisma.advance.findMany({
        where: { employeeId },
        include: {
          employee: {
            include: {
              user: true,
              employer: true,
            },
          },
        },
        orderBy: { requestDate: "desc" },
      });
    } else if (employerId) {
      return await prisma.advance.findMany({
        where: { employerId },
        include: {
          employee: {
            include: {
              user: true,
              employer: true,
            },
          },
        },
        orderBy: { requestDate: "desc" },
      });
    } else {
      throw new Error("Either id, employeeId, or employerId must be provided");
    }
  }

  async create(data: CreateAdvanceData) {
    return await prisma.advance.create({
      data,
      include: {
        employee: {
          include: {
            user: true,
            employer: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateAdvanceData) {
    return await prisma.advance.update({
      where: { id },
      data,
      include: {
        employee: {
          include: {
            user: true,
            employer: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return await prisma.advance.delete({
      where: { id },
    });
  }

  async getByStatus(status: EnumAdvancesStatus, employerId?: string) {
    const whereClause: any = { status };
    if (employerId) {
      whereClause.employerId = employerId;
    }

    return await prisma.advance.findMany({
      where: whereClause,
      include: {
        employee: {
          include: {
            user: true,
            employer: true,
          },
        },
      },
      orderBy: { requestDate: "desc" },
    });
  }

  async getOutstandingByEmployee(employeeId: string) {
    return await prisma.advance.findMany({
      where: {
        employeeId,
        status: {
          in: [
            EnumAdvancesStatus.PENDING,
            EnumAdvancesStatus.APPROVED,
            EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
            EnumAdvancesStatus.DISBURSED,
            EnumAdvancesStatus.PAID,
          ],
        },
      },
      include: {
        employee: {
          include: {
            user: true,
            employer: true,
          },
        },
      },
    });
  }

  async getStatistics(employerId?: string) {
    const whereClause = employerId ? { employerId } : {};

    const [
      totalCount,
      pendingCount,
      approvedCount,
      disbursedCount,
      repaidCount,
      defaultedCount,
      totalAmount,
      totalRepaid,
      totalDefaulted,
    ] = await Promise.all([
      prisma.advance.count({ where: whereClause }),
      prisma.advance.count({
        where: { ...whereClause, status: EnumAdvancesStatus.PENDING },
      }),
      prisma.advance.count({
        where: { ...whereClause, status: EnumAdvancesStatus.APPROVED },
      }),
      prisma.advance.count({
        where: { ...whereClause, status: EnumAdvancesStatus.DISBURSED },
      }),
      prisma.advance.count({
        where: { ...whereClause, status: EnumAdvancesStatus.REPAID },
      }),
      prisma.advance.count({
        where: { ...whereClause, status: EnumAdvancesStatus.DEFAULTED },
      }),
      prisma.advance.aggregate({
        where: whereClause,
        _sum: { amount: true },
      }),
      prisma.advance.aggregate({
        where: { ...whereClause, status: EnumAdvancesStatus.REPAID },
        _sum: { repaymentAmount: true },
      }),
      prisma.advance.aggregate({
        where: { ...whereClause, status: EnumAdvancesStatus.DEFAULTED },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalCount,
      pendingCount,
      approvedCount,
      disbursedCount,
      repaidCount,
      defaultedCount,
      totalAmount: totalAmount._sum.amount || new Decimal(0),
      totalRepaid: totalRepaid._sum.repaymentAmount || new Decimal(0),
      totalDefaulted: totalDefaulted._sum.amount || new Decimal(0),
      defaultRate: totalCount > 0 ? (defaultedCount / totalCount) * 100 : 0,
      repaymentRate: totalCount > 0 ? (repaidCount / totalCount) * 100 : 0,
    };
  }

  async getOverdueAdvances() {
    const today = new Date();
    return await prisma.advance.findMany({
      where: {
        dueDate: { lt: today },
        status: {
          in: [EnumAdvancesStatus.DISBURSED, EnumAdvancesStatus.PAID],
        },
      },
      include: {
        employee: {
          include: {
            user: true,
            employer: true,
          },
        },
      },
    });
  }

  async getAdvancesByDateRange(startDate: Date, endDate: Date, employerId?: string) {
    const whereClause: any = {
      requestDate: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (employerId) {
      whereClause.employerId = employerId;
    }

    return await prisma.advance.findMany({
      where: whereClause,
      include: {
        employee: {
          include: {
            user: true,
            employer: true,
          },
        },
      },
      orderBy: { requestDate: "desc" },
    });
  }

  async calculatePoolUtilization(employerId?: string) {
    const poolWhereClause = employerId ? { employerId } : {};
    const advanceWhereClause: any = {
      status: {
        in: [EnumAdvancesStatus.DISBURSED, EnumAdvancesStatus.PAID],
      },
    };

    if (employerId) {
      advanceWhereClause.employerId = employerId;
    }

    const [poolStats, outstandingAdvances] = await Promise.all([
      prisma.liquidityPool.aggregate({
        where: poolWhereClause,
        _sum: { amount: true },
      }),
      prisma.advance.aggregate({
        where: advanceWhereClause,
        _sum: { amount: true },
      }),
    ]);

    const totalPool = poolStats._sum.amount || new Decimal(0);
    const totalOutstanding = outstandingAdvances._sum.amount || new Decimal(0);

    if (totalPool.equals(0)) {
      return {
        totalPool: totalPool.toString(),
        totalOutstanding: totalOutstanding.toString(),
        availableLiquidity: "0",
        utilizationPercentage: 0,
      };
    }

    const availableLiquidity = new Decimal(totalPool.toString()).minus(
      new Decimal(totalOutstanding.toString())
    );
    const utilizationPercentage = new Decimal(totalOutstanding.toString())
      .div(new Decimal(totalPool.toString()))
      .mul(100)
      .toNumber();

    return {
      totalPool: totalPool.toString(),
      totalOutstanding: totalOutstanding.toString(),
      availableLiquidity: availableLiquidity.toString(),
      utilizationPercentage,
    };
  }

  async bulkUpdateStatus(advanceIds: string[], status: EnumAdvancesStatus, updateData?: Partial<UpdateAdvanceData>) {
    return await prisma.advance.updateMany({
      where: {
        id: { in: advanceIds },
      },
      data: {
        status,
        ...updateData,
      },
    });
  }
}

const advanceService = new AdvanceService();
export default advanceService;
