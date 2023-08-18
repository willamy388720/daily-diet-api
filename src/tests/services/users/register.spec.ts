import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { RegisterService } from "@/services/users/register";
import { compare } from "bcryptjs";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(inMemoryUsersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Zé das Cabras",
      email: "zecabras@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "zecabras@email.com";

    await sut.execute({
      name: "Zé das Cabras",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Zé das Cabras",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
