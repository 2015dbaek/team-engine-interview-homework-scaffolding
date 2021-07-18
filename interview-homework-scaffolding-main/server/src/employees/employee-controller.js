import { DataAccessController } from '../data/data-access-controller';
export class EmployeeController {

  static getAll = async (opts) => {
    const employees = DataAccessController.employees.getAll();
    if(opts.employeeId){
      const { employeeId } = opts;
      return ((employees.find(e => e.employeeId === Number(employeeId)) == undefined)? null : employees.find(e => e.employeeId === Number(employeeId)));
    } else if(opts.firstName && opts.lastName){
      const { firstName, lastName } = opts;
      const findByName = employees.find(e => e.firstName.toLowerCase() === String(firstName).toLowerCase() &&
       e.lastName.toLowerCase() === String(lastName).toLowerCase());
      return (findByName == undefined? null : findByName);
    }
    return employees;
  };

}
