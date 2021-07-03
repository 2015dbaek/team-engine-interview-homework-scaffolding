import { DataAccessController } from '../data/data-access-controller';
export class EmployeeController {

  static getAll = async (opts) => {
    const { employeeId } = opts;
    let employees = DataAccessController.employees.getAll();
    if (employeeId) {
      return employees.find(e => e.id = employeeId);
    }
    return employees;
  };

}
