
import { asyncRequestHandler } from '../util/async-request-handler';
import { MessageHandlers } from './message-handlers';

export const addMessageRoutes = (app) => {
  app.route('/messages')
    .get(asyncRequestHandler(MessageHandlers.getAll));
};
