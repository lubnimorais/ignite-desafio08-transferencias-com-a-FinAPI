import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

describe('Show an user', () => {
  let createUserUseCase: CreateUserUseCase;
  let showUserProfileUseCase: ShowUserProfileUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
  })

  it ('Should be able show an user', async () => {
    const newUser = await createUserUseCase.execute({
      name: 'Test',
      email: 'test@test.com.br',
      password: '12345'
    })

    const user = await showUserProfileUseCase.execute(newUser.id)

    expect(user).toHaveProperty('id');
  })

  it ('should not be able show an user not exists', async () => {
    expect(async ()=> {
      await createUserUseCase.execute({
        name: 'Test',
        email: 'test@test.com.br',
        password: '12345'
      })

      await showUserProfileUseCase.execute('user-id')
    }).rejects.toBeInstanceOf(AppError)
  })
})
