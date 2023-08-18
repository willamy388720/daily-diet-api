import { Prisma, Snack } from "@prisma/client";
import { SnacksRepository } from "../snacks-repository";
import { randomUUID } from "node:crypto";

export class InMemorySnacksRepository implements SnacksRepository {
  public items: Snack[] = [];

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
