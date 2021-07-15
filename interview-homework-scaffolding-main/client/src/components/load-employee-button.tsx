import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import { BasicTable } from './table'
import { MessagesButton } from './messages-button'

import { Api } from '../util/api';

export const LoadEmployeesButton = () => {
  const [employeeList, setEmployeeList] = useState(null); //why set employeelist to set employeelist?
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const handleCloseDialog = () => setIsLoadingEmployees(false);

  const [loadEmployee, setLoadEmployee] = useState({
    employeeId: -1, firstName: "", lastName: "", email: "",
    phoneNumber: "", jobTitle: "", nickname: "", startDate: ""
  });
  const [isLoadingEmployee, setIsLoadingEmployee] = useState<boolean>(false);
  const handleCloseDialogS = () => setIsLoadingEmployee(false);
  //const [employeeId, setEmployeeId] = useState<Number>(); //hold the number for checking loading employee

  const [loadGroups, setLoadGroups] = useState([{ name: "" }]);

  const handleClickLoadingEmployees = async () => {

    const response = await Api.get('/employees');
    const employees = await response.json();
    setEmployeeList(employees);
    setIsLoadingEmployees(true);
    console.log(employees);
  };

  const handleClickLoadingEmployee = async () => {
    var idCheck = true;
    var num = prompt("Enter Employee ID: ", ""); //prompts can be textfields and alerts can be dialog boxes
    while (idCheck) {
      if (num == null) { //to exit out of prompt
        idCheck = false;
        return;
      }
      if (isNaN(parseInt(num))) { //could add implementation for employee name search
        num = prompt("Invalid Employee ID, Enter again: ", "");
      } else {
        const response = await Api.get('/employees?employeeId=' + num);
        const employee = await response.json();
        if (employee == null) {
          num = prompt("Invalid Employee ID, Enter again: ", "");
        } else {
          idCheck = false;
          setLoadEmployee(employee);
          console.log(employee);
          setIsLoadingEmployee(true);
        }
      }
    }
    const groupResponse = await Api.get('/groups?employeeId=' + num);
    const groups = await groupResponse.json();
    console.log(groups);
    setLoadGroups(groups);
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
      {isLoadingEmployees ? (
        <Dialog open onClose={handleCloseDialog} disableEnforceFocus fullScreen>
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Employee List</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialog} />
          </div>
          <BasicTable elist={employeeList} />
        </Dialog>
      ) : null}

      <Button
        className="u-margin-left-md"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickLoadingEmployee}
      >
        Load Single Employee
      </Button>
      {isLoadingEmployee ? (
        <Dialog open onClose={handleCloseDialogS} disableEnforceFocus>
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Employee</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialogS} />
          </div>
          <div className="u-padding-lg">
            <p className="employeeNameLoad">{loadEmployee ? loadEmployee.firstName + " " + loadEmployee.lastName +
              (loadEmployee.nickname ? " (" + loadEmployee.nickname + ")" : "") : "Loading Employee Info..."}</p>
            <div className="employeeInfoLoad">
              <p>Employee ID: <span className="boldInfoLoad"> {" " + loadEmployee.employeeId + " "} </span>
              | Email: <span className="boldInfoLoad">{" " + loadEmployee.email + " "}</span> 
              | Telephone: <span className="boldInfoLoad">{" " + (loadEmployee.phoneNumber === "" ? "Unknown" : loadEmployee.phoneNumber) + " "}</span>
              </p>
              <p>Job Title:  <span className="boldInfoLoad">{" " + (loadEmployee.jobTitle === "" ? "Unknown" : loadEmployee.jobTitle) + " "}</span></p>
              <p>Start Date: <span className="boldInfoLoad">{" " + (loadEmployee.startDate === "" ? "Unknown" : loadEmployee.startDate.split("T").shift()) + " "}</span></p>
            <p>Department(s): {loadGroups ? (loadGroups.length === 0 ? "Employee does not belong to a Department" :
            loadGroups.map((groupsN) => <span className="boldInfoLoad"> {" " + groupsN + ", "} </span>)) : "Loading Groups Info..."}</p>
            </div>
          </div>
          <MessagesButton employee={loadEmployee} />
        </Dialog>
      ) : null}

    </>
  )
}