import { DataAccessController } from '../data/data-access-controller';
export class MessageController {

  static getAll = async (opts) => {
    const { employeeId } = opts;
    let messages = DataAccessController.messages.getAll();
    if (employeeId) {
      return messages.filter(e => e.employeeId == employeeId);
    }
    return messages;
  };

}
