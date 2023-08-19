import { InMemorySnacksRepository } from "@/repositories/in-memory/in-memory-snacks-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { MetricsService } from "@/services/users/metrics";
import { hash } from "bcryptjs";

let inMemorySnacksRepository: InMemorySnacksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: MetricsService;

describe("Metrics Service", () => {
  beforeEach(() => {
    inMemorySnacksRepository = new InMemorySnacksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new MetricsService(inMemorySnacksRepository, inMemoryUsersRepository);
  });

  it("should be able to update a snack", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    });

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
        await inMemorySnacksRepository.create({
          user_id: user.id,
          name: `Uma refeição ${index}`,
          description: "Só uma refeição",
          date: new Date(),
          hour: "12:00",
          is_on_diet: item,
        })
    );

    const {
      numberOfSnacks,
      numberOfSnacksOnDiet,
      numberOfSnacksOffDiet,
      bestSequelOfSnackOnDiet,
    } = await sut.execute({
      userId: user.id,
    });

    expect(numberOfSnacks).toEqual(20);
    expect(numberOfSnacksOnDiet).toEqual(14);
    expect(numberOfSnacksOffDiet).toEqual(6);
    expect(bestSequelOfSnackOnDiet).toEqual(5);
  });

  it.skip("should not be able to metrics without user valid", async () => {
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

    await inMemorySnacksRepository.create({
      user_id: user.id,
      name: "Uma refeição",
      description: "Só uma refeição",
      date: new Date(),
      hour: "12:00",
      is_on_diet: false,
    });

    expect(async () =>
      sut.execute({
        userId: user_2.id,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
