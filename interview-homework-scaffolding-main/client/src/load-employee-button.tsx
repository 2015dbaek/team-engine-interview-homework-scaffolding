import React from 'react';
import Button from '@material-ui/core/Button';

import { Api } from './util/api';

export const LoadEmployeesButton = () => {

  const handleClickLoadingEmployees = async () => {
    const response = await Api.get('/employees');
    const employees = await response.json();
    console.log(employees);
  };

  const handleClickLoadingEmployee = async () => {
    const response = await Api.get('/employees?employeeId=34');
    const employee = await response.json();
    console.log(employee);
  };

  return (
    <>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickLoadingEmployees}
      >
        Load Employees
      </Button>
      <Button
        className="u-margin-left-md"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickLoadingEmployee}
      >
        Load Single Employee
      </Button>
    </>
  )
}
