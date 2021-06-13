import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase"

describe('Create a user', () => {

  let createUserUseCase: CreateUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it ('should be able create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Test',
      email: 'test@test.com.br',
      password: '12345'
    })

    expect(user).toHaveProperty('id')
  })


  it ('should not be able create a user with exists email', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'Test',
        email: 'test@test.com.br',
        password: '12345'
      })

      await createUserUseCase.execute({
        name: 'Test1',
        email: 'test@test.com.br',
        password: '12345'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
