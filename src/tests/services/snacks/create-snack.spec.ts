import { InMemorySnacksRepository } from "@/repositories/in-memory/in-memory-snacks-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CreateSnackService } from "@/services/snacks/create-snack";
import { hash } from "bcryptjs";

let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateSnackService;

describe("Create Snack Service", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateSnackService(
      inMemorySnacksRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to create a snack", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    });

    const { snack } = await sut.execute({
      userId: user.id,
      name: "Uma refeição",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      isOnDiet: false,
    });

    expect(user.id).toEqual(snack.user_id);
    expect(snack.id).toEqual(expect.any(String));
  });
});
