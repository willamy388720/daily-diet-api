import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";

describe("Fetch Snacks (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch snacks", async () => {
    const { token, user } = await createAndAuthenticate(app);

    await prisma.snack.create({
      data: {
        user_id: user.id,
        name: "Uma refeição 1",
        description: "Uma boa refeição equilibrada",
        date: new Date(),
        hour: "12:00",
        is_on_diet: true,
      },
    });

    await prisma.snack.create({
      data: {
        user_id: user.id,
        name: "Uma refeição 2",
        description: "Uma boa refeição equilibrada",
        date: new Date(),
        hour: "12:00",
        is_on_diet: true,
      },
    });

    await prisma.snack.create({
      data: {
        user_id: user.id,
        name: "Uma refeição 3",
        description: "Uma boa refeição equilibrada",
        date: new Date(),
        hour: "12:00",
        is_on_diet: true,
      },
    });

    const response = await request(app.server)
      .get(`/snacks`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.snacks).toEqual([
      expect.objectContaining({ name: "Uma refeição 1" }),
      expect.objectContaining({ name: "Uma refeição 2" }),
      expect.objectContaining({ name: "Uma refeição 3" }),
    ]);
  });
});
