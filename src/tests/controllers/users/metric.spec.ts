import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";

describe("metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get metrics", async () => {
    const { token, user } = await createAndAuthenticate(app);

    const onDietList = [
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
    ];

    onDietList.forEach(
      async (item, index) =>
        await prisma.snack.create({
          data: {
            user_id: user.id,
            name: `Uma refeição ${index}`,
            description: "Só uma refeição",
            date: new Date(),
            hour: "12:00",
            is_on_diet: item,
          },
        })
    );

    const response = await request(app.server)
      .get("/users/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
