import { Address, Prisma } from "@prisma/client";
import { prisma } from "../utils/database";

export class AddressRepository {
  async findByZip(zip: string): Promise<Address | null> {
    return await prisma.address.findFirst({
      where: {
        zip,
      },
    });
  }

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    return await prisma.address.create({
      data,
    });
  }
}
