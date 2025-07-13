import "dotenv/config";
import { prisma } from "../database";

class MarketerService {
  async get(data: { id?: number; userId?: string }) {
    const { id, userId } = data;

    if (id) {
      return await prisma.marketer.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
    } else if (userId) {
      return await prisma.marketer.findUnique({
        where: { userId },
        include: {
          user: true,
        },
      });
    } else {
      throw new Error("Either id or userId must be provided");
    }
  }

  async create(data: { userId: string; registrationDate: Date }) {
    return await prisma.marketer.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(id: number, data: Partial<{ registrationDate: Date }>) {
    return await prisma.marketer.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: number) {
    return await prisma.marketer.delete({
      where: { id },
    });
  }

  async getAll() {
    return await prisma.marketer.findMany({
      include: {
        user: true,
      },
    });
  }
}

const marketerService = new MarketerService();

export default marketerService;
