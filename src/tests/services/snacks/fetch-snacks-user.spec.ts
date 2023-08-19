import { InMemorySnacksRepository } from "@/repositories/in-memory/in-memory-snacks-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { FetchSnacksUserService } from "@/services/snacks/fetch-snacks-user";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";

let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: FetchSnacksUserService;

describe("Fetch Snacks User Service", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FetchSnacksUserService(
      inMemorySnacksRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to fetch snacks by user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    });

    await inMemorySnacksRepository.create({
      user_id: user.id,
      name: "Uma refeição",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      is_on_diet: false,
    });

    await inMemorySnacksRepository.create({
      user_id: user.id,
      name: "Uma refeição 2",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      is_on_diet: false,
    });

    await inMemorySnacksRepository.create({
      user_id: user.id,
      name: "Uma refeição 3",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      is_on_diet: false,
    });

    await inMemorySnacksRepository.create({
      user_id: randomUUID(),
      name: "Uma refeição 4",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      is_on_diet: false,
    });

    const { snacks } = await sut.execute({
      userId: user.id,
    });

    expect(snacks).toHaveLength(3);
    expect(snacks).toEqual([
      expect.objectContaining({ name: "Uma refeição" }),
      expect.objectContaining({ name: "Uma refeição 2" }),
      expect.objectContaining({ name: "Uma refeição 3" }),
    ]);
  });
});
