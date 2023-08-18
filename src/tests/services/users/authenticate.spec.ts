import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/services/errors/invalid-credententials-error";
import { AuthenticateService } from "@/services/users/authenticate";
import { hash } from "bcryptjs";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("AuthenticatedService Service", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(inMemoryUsersRepository);
  });

  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "zedascabras@mail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      name: "Zé das Cabras",
      email: "zedascabras@mail.com",
      password_hash: await hash("123123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "zedascabras@mail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "zedascabras@mail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
