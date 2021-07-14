import { MessageController } from './message-controller';
export class MessageHandlers {
  static getAll = async (req, res, next) => {
    const { employeeId } = req.query;
    const messages = await MessageController.getAll({
      employeeId
    });
    return res.json(messages);
  }
}
