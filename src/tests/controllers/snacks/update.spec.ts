import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";

describe("Update Snack (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a snack", async () => {
    const { token, user } = await createAndAuthenticate(app);

    const snack = await prisma.snack.create({
      data: {
        user_id: user.id,
        name: "Uma refeição",
        description: "Uma boa refeição equilibrada",
        date: new Date(),
        hour: "12:00",
        is_on_diet: true,
      },
    });

    const response = await request(app.server)
      .put(`/snacks/${snack.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Uma refeição editada",
        description: "Uma boa refeição equilibrada",
        date: "12/12/23",
        hour: "12:00",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(201);
  });
});
