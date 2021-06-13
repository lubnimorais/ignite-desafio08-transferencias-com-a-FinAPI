import { Router } from 'express';

import { CreateStatementController } from '../modules/statements/useCases/createStatement/CreateStatementController';
import { GetBalanceController } from '../modules/statements/useCases/getBalance/GetBalanceController';
import { GetStatementOperationController } from '../modules/statements/useCases/getStatementOperation/GetStatementOperationController';
import { TransferStatementController } from '../modules/statements/useCases/transferStatement/TransferStatementController';
import { ensureAuthenticated } from '../shared/infra/http/middlwares/ensureAuthenticated';

const statementRouter = Router();
const getBalanceController = new GetBalanceController();
const createStatementController = new CreateStatementController();
const getStatementOperationController = new GetStatementOperationController();
const transferStatementController = new TransferStatementController();

statementRouter.use(ensureAuthenticated);

statementRouter.get('/balance', getBalanceController.execute);
statementRouter.post('/deposit', ensureAuthenticated, createStatementController.execute);
statementRouter.post('/withdraw', ensureAuthenticated, createStatementController.execute);
statementRouter.post('/transfer/deposit/:sender_id', ensureAuthenticated, transferStatementController.execute);
statementRouter.post('/transfer/withdraw/:sender_id', ensureAuthenticated, transferStatementController.execute);
statementRouter.get('/:statement_id', getStatementOperationController.execute);

export { statementRouter };
