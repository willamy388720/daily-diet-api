import { app } from "@/app";
import request from "supertest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/signup").send({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
