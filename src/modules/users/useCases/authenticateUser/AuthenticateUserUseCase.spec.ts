import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe('Authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test',
      email: 'user@test.com',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User Test Error',
        email: 'user@user.com',
        password: '123456',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})
