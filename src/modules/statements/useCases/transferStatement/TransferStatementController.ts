import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { TransferStatementUseCase } from './TransferStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER_DEPOSIT = 'transfer_deposit',
  TRANSFER_WITHDRAW = 'transfer_withdraw'
}

export class TransferStatementController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { sender_id } = request.params;
    const { amount, description } = request.body;

    const splittedPath = request.originalUrl.split('/')
    const type = splittedPath[splittedPath.length - 2] as OperationType;

    const transferStatement = container.resolve(TransferStatementUseCase);

    const statement = await transferStatement.execute({
      user_id,
      sender_id,
      type: type === 'deposit' ? OperationType.TRANSFER_DEPOSIT : OperationType.TRANSFER_WITHDRAW,
      amount,
      description
    });

    return response.status(201).json(statement);
  }
}
