
import { asyncRequestHandler } from '../util/async-request-handler';
import { GroupHandlers } from './group-handlers';

export const addGroupRoutes = (app) => {
  app.route('/groups')
    .get(asyncRequestHandler(GroupHandlers.getAll))
};
