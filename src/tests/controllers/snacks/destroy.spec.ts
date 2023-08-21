import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";

describe("Destroy Snack (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to destroy a snack", async () => {
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
      .delete(`/snacks/${snack.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(201);
  });
});
