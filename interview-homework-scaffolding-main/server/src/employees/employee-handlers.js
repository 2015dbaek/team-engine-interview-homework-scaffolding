import { DataAccessController } from '../data/data-access-controller';
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    let employees = DataAccessController.employees.getAll();
    if(employees.find(e => (e.firstName === firstName && e.lastName === lastName && e.email === email))) {
      console.log("employee begone"); 
      return res.status(400).json({ error: 'Employee Exists' });
    }  
    var newEmployee = req.body
    newEmployee.employeeId = DataAccessController.employees.getAll().length + 1;
    DataAccessController.employees.add(newEmployee);
    console.log(newEmployee);
    return res.json(newEmployee); 
  }
}
