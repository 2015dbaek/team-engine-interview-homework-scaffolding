import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { BasicTable } from './table'

import { Api } from '../util/api';

export const LoadEmployeesButton = () => {
  const [employeeList, setEmployeeList] = useState(null); //why set employeelist to set employeelist?
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const handleCloseDialog = () => {setIsLoadingEmployees(false)};

  const [loadEmployee, setLoadEmployee] = useState({
    employeeId: "", firstName: "", lastName: "", email: "",
    phoneNumber: "", jobTitle: "", nickname: "", startDate: ""
  });
  const [isLoadingEmployee, setIsLoadingEmployee] = useState<boolean>(false);
  const handleCloseDialogS = () => {
    setIsLoadingEmployee(false);
    setShowEmployeeInfo(false);
    setEmployeeP("");
  };
  const [employeeP, setEmployeeP] = useState<string>(''); //hold the number for checking loading employee
  const [loadEmployeeNotification, setLoadEmployeeNotification] = useState<string>('');

  const [loadGroups, setLoadGroups] = useState([{ name: "" }]);

  const [showEmployeeInfo, setShowEmployeeInfo] = useState<boolean>(false);

  const [loadMessage, setLoadMessage] = useState([{ dateTime: "", employeeId: -1, isInbound: false, messageBody: "", sentByName: "" }]);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleTextFieldChange = (fieldSetter: (newValue: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    fieldSetter(event.target.value);
  };

  const handleClickLoadingEmployees = async () => {

    const response = await Api.get('/employees');
    const employees = await response.json();
    setEmployeeList(employees);
    setIsLoadingEmployees(true);
    console.log(employees);
  };

  const handleSearchEmployee = async () => {

    var response;
    var employee;
    if (isNaN(parseInt(employeeP))) { //check if employeeP is not a number aka a name
      const name = (employeeP ? employeeP.split(" ") : []);
      console.log(name[0] + " " + name[1]);
      response = await Api.get('/employees?firstName=' + name[0] + '&lastName=' + name[1]);
      employee = await response.json();
      if (employee == null) {
        setLoadEmployeeNotification("Employee was not found, try again");
      } else {
        setLoadEmployee(employee);
        console.log(employee);
        setIsLoadingEmployee(true);
        setShowEmployeeInfo(true);
        const groupResponse = await Api.get('/groups?employeeId=' + employee.employeeId);
        const groups = await groupResponse.json();
        console.log(groups);
        setLoadGroups(groups);
        setLoadEmployeeNotification("");
        setShowMessage(false);
      }
    } else { //employeeP is a number
      response = await Api.get('/employees?employeeId=' + employeeP);
      employee = await response.json();
      if (employee == null) {
        setLoadEmployeeNotification("Employee was not found, try again");
      } else {
        setLoadEmployee(employee);
        console.log(employee);
        setIsLoadingEmployee(true);
        setShowEmployeeInfo(true);
        const groupResponse = await Api.get('/groups?employeeId=' + employee.employeeId);
        const groups = await groupResponse.json();
        console.log(groups);
        setLoadGroups(groups);
        setLoadEmployeeNotification("");
        setShowMessage(false);
      }
    }
  };

  const handleClickLoadingEmployee = async () => {
    setIsLoadingEmployee(true);
  };

  const outputEmployee = () => {
    return (
      <div>
        <p className="employeeNameLoad" data-testid="employeeNameTest">{loadEmployee ? loadEmployee.firstName + " " + loadEmployee.lastName +
          (loadEmployee.nickname ? " (" + loadEmployee.nickname + ")" : "") : "Loading Employee Info..."}</p>
        <div className="employeeInfoLoad">
          <p>Employee ID: <span className="boldInfoLoad" data-testid="employeeIdTest"> {" " + loadEmployee.employeeId + " "} </span>
            | Email: <span className="boldInfoLoad" data-testid="employeeEmailTest">{" " + loadEmployee.email + " "}</span>
            | Telephone: <span className="boldInfoLoad" data-testid="employeePhoneNumberTest">
              {" " + (loadEmployee.phoneNumber === "" ? "Unknown" : loadEmployee.phoneNumber) + " "}</span>
          </p>
          <p>Job Title:  <span className="boldInfoLoad" data-testid="employeeJobTitleTest">{" " + (loadEmployee.jobTitle === "" ? "Unknown" : loadEmployee.jobTitle) + " "}</span></p>
          <p>Start Date: <span className="boldInfoLoad" data-testid="employeeStartDateTest">{" " + (loadEmployee.startDate === "" ? "Unknown" : loadEmployee.startDate.split("T").shift()) + " "}</span></p>
          <p>Department(s): <span data-testid="employeeGroupsTest">{loadGroups ? (loadGroups.length === 0 ? <span className="boldInfoLoad">Employee does not belong to a Department</span> :
            <span className="boldInfoLoad">{loadGroups.join(", ")}</span>) : "Loading Groups Info..."}</span></p>
        </div>
      </div>
    )
  }

  const handleClickLoadingMessages = async () => {

    const response = await Api.get('/messages?employeeId=' + loadEmployee.employeeId);
    const messages = await response.json();
    console.log(messages);
    setLoadMessage(messages);
    setShowMessage(true);
  };

  return (
    <>
      <Button
        data-testid="loadEmployeesButtonTest"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickLoadingEmployees}
      >
        Load Employees
      </Button>
      {isLoadingEmployees ? (
        <Dialog open onClose={handleCloseDialog} disableEnforceFocus fullScreen data-testid="loadEmployeesDialogueTest">
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Employee List</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialog} />
          </div>
          <BasicTable elist={employeeList} />
        </Dialog>
      ) : null}

      <Button
        data-testid="loadEmployeeButtonTest"
        className="u-margin-left-md"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickLoadingEmployee}
      >
        Load Single Employee
      </Button>
      {isLoadingEmployee ? (
        <Dialog open onClose={handleCloseDialogS} disableEnforceFocus data-testid="loadEmployeeDialogueTest">
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Load Single Employee</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialogS} />
          </div>
          <div data-testid="searchEmployeeTitle">Search Employee by ID or First/Last Name</div>
          <TextField
            data-testid="searchEmployeeTest"
            variant="outlined"
            label="Employee"
            required
            error={employeeP.length === 0 ? true : false}
            helperText={employeeP.length === 0 ? "This field cannot be empty!" : false}
            value={employeeP}
            onChange={handleTextFieldChange(setEmployeeP)}
          />
          <div id="errorMessageBox">{loadEmployeeNotification ? loadEmployeeNotification : ""}</div>
          <div className="u-display-flex u-alignItems-center u-padding-lg u-no-padding-top u-justifyContent-flexEnd">
            <Button
              size="medium"
              variant="contained"
              color="default"
              onClick={handleCloseDialogS}
            >
              Cancel
            </Button>
            <Button
            data-testid="testSingleEmployeeSearchButton"
              className="u-margin-left-md"
              size="medium"
              variant="contained"
              color="secondary"
              onClick={handleSearchEmployee}
            >
              Search
            </Button>
          </div>
          {showEmployeeInfo?(
            <div>  
          <div className="u-padding-lg">
              {outputEmployee()}
            </div>
            <div>
      <div className="u-padding-lg">
        <Button
        data-testid="messagesButtonTest"
          size="medium"
          variant="contained"
          color="secondary"
          onClick={handleClickLoadingMessages}
        >
          Load Employee Messages
        </Button>
        {showMessage?(loadMessage ? loadMessage.length === 0 ? <p className="emptyMessage">{" No Message History"}</p> :
          loadMessage.filter(message => message.employeeId !== -1).map((message, index) =>
            <div className={message.sentByName ? "message" : "selfmessage"} key={index}>
              <p><div className="messageName">{message.sentByName ? message.sentByName : loadEmployee.firstName}</div>
               Sent at {message.dateTime.split(".").shift()?.replace("T", " ")}</p>
              <p>{message.messageBody}</p>
            </div>
          ) : "Loading..."): null}
      </div>
    </div>
            </div>): null}
        </Dialog>
      ) : null}

    </>
  )
}