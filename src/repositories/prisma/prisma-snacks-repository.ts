import { Prisma, Snack } from "@prisma/client";
import { SnacksRepository } from "../snacks-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSnacksRepository implements SnacksRepository {
  async findByBestSequel(userId: string) {
    let bestSequel = 0;
    let sequel = 0;

    const snacks = await this.findSnacksByUser(userId);

    snacks.forEach((item) => {
      if (item.is_on_diet === true) {
        sequel += 1;
      } else {
        if (sequel > bestSequel) {
          bestSequel = sequel;
        }
        sequel = 0;
      }
    });

    return bestSequel;
  }

  async findByOnDiet(userId: string, onDiet: boolean) {
    const snacks = await prisma.snack.findMany({
      where: {
        AND: {
          user_id: userId,
          is_on_diet: onDiet,
        },
      },
    });

    return snacks;
  }

  async findSnacksByUser(userId: string) {
    const snacks = await prisma.snack.findMany({
      where: {
        user_id: userId,
      },
    });

    return snacks;
  }

  async destroy(snack: Snack) {
    await prisma.snack.delete({ where: { id: snack.id } });
  }

  async save(data: Snack) {
    const snack = await prisma.snack.update({
      where: { id: data.id },
      data,
    });

    return snack;
  }

  async findByIdAndUserId(id: string, userId: string) {
    const snack = await prisma.snack.findFirst({
      where: {
        AND: {
          id: id,
          user_id: userId,
        },
      },
    });

    return snack;
  }

  async create(data: Prisma.SnackUncheckedCreateInput) {
    const snack = await prisma.snack.create({ data });

    return snack;
  }
}
