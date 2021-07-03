
import { asyncRequestHandler } from '../util/async-request-handler';
import { EmployeeHandlers } from './employee-handlers';

export const addEmployeeRoutes = (app) => {
  app.route('/employees')
    .get(asyncRequestHandler(EmployeeHandlers.getAll))
    .post(asyncRequestHandler(EmployeeHandlers.create));
};
