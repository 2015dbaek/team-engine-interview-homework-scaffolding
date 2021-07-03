import { EmployeeController } from './employee-controller';
export class EmployeeHandlers {
  static getAll = async (req, res, next) => {
    const { employeeId } = req.query;
    const employees = await EmployeeController.getAll({
      employeeId
    });
    return res.json(employees);
  }

  static create = async (req, res, next) => {
    throw new Error('Not Implemented');
  }
}
