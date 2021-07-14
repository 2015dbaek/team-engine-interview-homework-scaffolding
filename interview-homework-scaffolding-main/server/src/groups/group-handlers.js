import { GroupController } from './group-controller';
export class GroupHandlers {
  static getAll = async (req, res, next) => {
    const { employeeId } = req.query;
    const groups = await GroupController.getAll({
      employeeId
    });
    return res.json(groups);
  }
}
