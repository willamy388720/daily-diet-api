import { InMemorySnacksRepository } from "@/repositories/in-memory/in-memory-snacks-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { GetSnackUserService } from "@/services/snacks/get-snack-user";
import { hash } from "bcryptjs";

let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetSnackUserService;

describe("Get Snack User Service", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetSnackUserService(
      inMemorySnacksRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to get a snack of user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    });

    const snackOfUser = await inMemorySnacksRepository.create({
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

    const { snack } = await sut.execute({
      id: snackOfUser.id,
      userId: user.id,
    });

    expect(snack).toEqual(expect.objectContaining({ name: "Uma refeição" }));
  });

  it("should not be able to get a snack without user valid", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    });

    const user_2 = await inMemoryUsersRepository.create({
      name: "Anonimo Conhecido",
      email: "anonimoconhecido@mail.com",
      password_hash: await hash("123456", 6),
    });

    const snack = await inMemorySnacksRepository.create({
      user_id: user.id,
      name: "Uma refeição",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      is_on_diet: false,
    });

    expect(async () =>
      sut.execute({
        id: snack.id,
        userId: user_2.id,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
