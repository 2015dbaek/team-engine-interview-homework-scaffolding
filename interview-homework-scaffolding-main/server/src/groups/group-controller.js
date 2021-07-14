import { DataAccessController } from '../data/data-access-controller';
export class GroupController {

  static getAll = async (opts) => {
    const { employeeId } = opts;
    let groups = DataAccessController.groups.getAll(); //1-5 all the groups
    let employeeGroups = DataAccessController.employeeGroups.getAll(); //this is id matched to groupid
    if (employeeId) {
      return employeeGroups.filter(e => e.employeeId == employeeId).map(e => groups.find(f => f.id == e.groupId).name);
    }
    return []; //shouldn't ever reach
  };

}
