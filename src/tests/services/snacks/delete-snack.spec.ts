import { InMemorySnacksRepository } from "@/repositories/in-memory/in-memory-snacks-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { DeleteSnackService } from "@/services/snacks/delete-snack";
import { hash } from "bcryptjs";

let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteSnackService;

describe("Delete Snack Service", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteSnackService(
      inMemorySnacksRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to delete a snack", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
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

    await sut.execute({
      id: snack.id,
      userId: user.id,
    });

    expect(inMemorySnacksRepository.items).toHaveLength(0);
  });

  it("should not be able to update a snack without user valid", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
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
        userId: "111",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
