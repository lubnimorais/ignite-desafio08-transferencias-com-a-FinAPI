import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";

import { OperationType } from '../../entities/Statement';
import { AppError } from "../../../../shared/errors/AppError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

describe('Get Balance', () => {

  let createStatementUseCase: CreateStatementUseCase;
  let createUserUseCase: CreateUserUseCase;
  let inMemoryUsersMemory: InMemoryUsersRepository;
  let inMemoryStatementMemory: InMemoryStatementsRepository;
  let getBalanceUseCase: GetBalanceUseCase;

  beforeEach(() => {
    inMemoryStatementMemory = new InMemoryStatementsRepository();
    inMemoryUsersMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersMemory);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersMemory, inMemoryStatementMemory)
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementMemory, inMemoryUsersMemory)
  })

  it ('should be able a get balance', async () => {
    const user = await createUserUseCase.execute({
      name: 'Test',
      email: 'test@test.com.br',
      password: '12345'
    });

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'Depósito bancário'
    });

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'Depósito bancário'
    });

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'Depósito bancário'
    });

    const balance = await getBalanceUseCase.execute({ user_id: user.id})

    expect(balance).toHaveProperty('balance');
  })

  it ('should not be able a get balance with nonexists user', async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: 'Test',
        email: 'test@test.com.br',
        password: '12345'
      });

      await createStatementUseCase.execute({
        user_id: user.id,
        type: OperationType.DEPOSIT,
        amount: 100,
        description: 'Depósito bancário'
      });

      await createStatementUseCase.execute({
        user_id: user.id,
        type: OperationType.DEPOSIT,
        amount: 100,
        description: 'Depósito bancário'
      });

      await createStatementUseCase.execute({
        user_id: user.id,
        type: OperationType.DEPOSIT,
        amount: 100,
        description: 'Depósito bancário'
      });

      await getBalanceUseCase.execute({ user_id: 'user-id'})
    }).rejects.toBeInstanceOf(AppError);
  })
})
