import { app } from "@/app";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";

describe("Create Snack (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a snack", async () => {
    const { token } = await createAndAuthenticate(app);

    const response = await request(app.server)
      .post("/snacks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Uma refeição",
        description: "Uma boa refeição equilibrada",
        date: "12/12/23",
        hour: "12:00",
        isOnDiet: true,
      });

    expect(response.statusCode).toEqual(201);
  });
});
