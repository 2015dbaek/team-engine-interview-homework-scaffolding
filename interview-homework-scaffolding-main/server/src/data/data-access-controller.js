
import employees from './employees';
import employeeGroups from './employee-groups';
import groups from './groups';
import messages from './messages';

export class DataAccessController {
  static employees = {
    getAll: () => employees,
    add: (newEmployee) => employees.push(newEmployee)
  };
  static employeeGroups = {
    getAll: () => employeeGroups,
    add: (newEmployeeGroup) => employeeGroups.push(newEmployeeGroup)
  };
  static groups = {
    getAll: () => groups,
    add: (newGroup) => groups.push(newGroup)
  };
  static messages = {
    getAll: () => messages,
    add: (newMessage) => messages.push(newMessage)
  };
}
