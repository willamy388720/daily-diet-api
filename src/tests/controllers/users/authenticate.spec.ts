import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await prisma.user.create({
      data: {
        name: "Zé das Cabras",
        email: "zedascabras@mail.com",
        password_hash: await hash("123456", 6),
      },
    });

    const response = await request(app.server).post("/signin").send({
      email: "zedascabras@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
