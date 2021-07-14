import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import { BasicTable } from './table'
import TextField from '@material-ui/core/TextField';
import { MessagesButton } from './messages-button'

import { Api } from './util/api';

export const LoadEmployeesButton = () => {
  const [employeeList, setEmployeeList] = useState(null); //why set employeelist to set employeelist?
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const handleCloseDialog = () => setIsLoadingEmployees(false);

  const [loadEmployee, setLoadEmployee] = useState(null);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState<boolean>(false);
  const handleCloseDialogS = () => setIsLoadingEmployee(false);
  const [employeeId, setEmployeeId] = useState<Number>(); //hold the number for checking loading employee

  const [loadGroups, setLoadGroups] = useState();

  const handleClickLoadingEmployees = async () => {

    const response = await Api.get('/employees'); 
    const employees = await response.json();
    setEmployeeList(employees); 
    setIsLoadingEmployees(true);
    console.log(employees);
  };

  const handleClickLoadingEmployee = async () => {
    var idCheck = true;
    var num = prompt("Enter Employee ID: ", "");
    while(idCheck){
      if(num == null){ //to exit out of prompt
        idCheck = false;
        return;
      }
      if(num == null || isNaN(parseInt(num))){ //have to do || check if the employeeid exists in file/is bigger than 200/is negative or something
        num = prompt("Invalid Employee ID, Enter again: ", "");
      } else {
      const response = await Api.get('/employees?employeeId=' + num); //search function by employeeId or possibly by name and can  just filter with name on top of employeeid
       const employee = await response.json();
       if(employee == null){
        num = prompt("Invalid Employee ID, Enter again: ", "");
       } else {
         idCheck = false;
         setLoadEmployee(employee); 
         console.log(loadEmployee);
         setEmployeeId(employee.employeeId);
         console.log(employeeId);
         setIsLoadingEmployee(true);
       }
      }
    }
  };

  /*const prettifyEmployee = (employee: any) => {
    var myEmployee = JSON.parse(employee);
    document.getElementById("test")!.innerHTML = myEmployee.firstName + " " + myEmployee.lastName;
  } */

  const handleLoadingGroups = async () => {
    const response = await Api.get('/groups?employeeId=' + employeeId); 
    const groups = await response.json();
    setLoadGroups(groups); 
    //const msg = JSON.parse(messages);
    //check if groups is empty array then say person is in no departments or something else parse
    console.log(groups);
  };

  /*const handleTextFieldChange = (fieldSetter: (newValue: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    fieldSetter(event.target.value);
  };*/

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
      {isLoadingEmployees?(
        <Dialog open onClose={handleCloseDialog} disableEnforceFocus fullScreen>
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Employee List</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialog} />
            </div>
            <BasicTable elist={employeeList}/>
          </Dialog>
      ) : null}

      <Button
        className="u-margin-left-md"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={() => {
          handleClickLoadingEmployee();
            handleLoadingGroups();
        }}
      >
        Load Single Employee
      </Button>
      {isLoadingEmployee?(
        <Dialog open onClose={handleCloseDialogS} disableEnforceFocus>
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Employee</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialogS} />
            </div>
            <p id="test"></p>
            {JSON.stringify(loadEmployee)}
            {JSON.stringify(loadGroups)}
            <MessagesButton employee={loadEmployee}/>
          </Dialog>
      ) : null}

    </>
  )
}