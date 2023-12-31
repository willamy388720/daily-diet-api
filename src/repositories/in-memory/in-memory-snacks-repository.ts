import { Prisma, Snack } from "@prisma/client";
import { SnacksRepository } from "../snacks-repository";
import { randomUUID } from "node:crypto";

export class InMemorySnacksRepository implements SnacksRepository {
  public items: Snack[] = [];

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
    return this.items.filter(
      (item) => item.user_id === userId && item.is_on_diet === onDiet
    );
  }

  async findSnacksByUser(userId: string) {
    return this.items.filter((item) => item.user_id === userId);
  }

  async destroy(snack: Snack) {
    const snackIndex = this.items.findIndex((item) => item.id === snack.id);

    this.items.splice(snackIndex, 1);
  }

  async save(snack: Snack) {
    const snackIndex = this.items.findIndex((item) => item.id === snack.id);

    if (snackIndex >= 0) {
      this.items[snackIndex] = snack;
    }

    return snack;
  }

  async findByIdAndUserId(id: string, userId: string) {
    const snack = this.items.find(
      (item) => item.id === id && item.user_id === userId
    );

    if (!snack) {
      return null;
    }

    return snack;
  }

  async create(data: Prisma.SnackUncheckedCreateInput) {
    const snack = {
      id: randomUUID(),
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      date: new Date(data.date),
      hour: data.hour,
      is_on_diet: data.is_on_diet,
    };

    this.items.push(snack);

    return snack;
  }
}
