import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticate(app: FastifyInstance) {
  const user = await prisma.user.create({
    data: {
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    },
  });

  const authResponse = await request(app.server).post("/signin").send({
    email: "zedascabras@mail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token, user };
}
