import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';

import { Api } from './util/api';

export const AddEmployeeButton = () => {

  const [isAddingEmployee, setIsAddingEmployee] = useState<boolean>(false);
  const handleClickAddingEmployee = () => setIsAddingEmployee(true);
  const handleCloseDialog = () => setIsAddingEmployee(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

  const handleTextFieldChange = (fieldSetter: (newValue: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    fieldSetter(event.target.value);
  };

  const handleCreateEmployee = async () => {
    const response = await Api.post('/employees', {
      body: JSON.stringify({
        firstName,
        lastName,
        nickname,
        phoneNumber,
        email,
        jobTitle,
        startDate,
      }),
    });
    const employeeAdd = await response.json();
    if(employeeAdd.error) { //could add an api UPDATE call here to instead update the user's info instead of an alert error
      alert("Employee Already Exists!");
    } else {
      alert("Employee Added, check EmployeeList to find new Employee");
    }
    setIsAddingEmployee(false);
  }

  return (
    <>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickAddingEmployee}
      >
        Add Employee +
      </Button>
      {isAddingEmployee ? (
        <Dialog open onClose={handleCloseDialog} disableEnforceFocus>
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Add New Employee</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialog} />
          </div>
          <div className="u-padding-lg">
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="First Name"
                required
                value={firstName}
                onChange={handleTextFieldChange(setFirstName)}
              />
            </div>
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="Last Name"
                required
                value={lastName}
                onChange={handleTextFieldChange(setLastName)}
              />
            </div>
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="Nickname"
                value={nickname}
                onChange={handleTextFieldChange(setNickname)}
              />
            </div>
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="Phone Number"
                value={phoneNumber}
                onChange={handleTextFieldChange(setPhoneNumber)}
              />
            </div>
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="Email"
                value={email}
                onChange={handleTextFieldChange(setEmail)}
              />
            </div>
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="Job Title"
                value={jobTitle}
                onChange={handleTextFieldChange(setJobTitle)}
              />
            </div>
            <div className="u-padding">
              <TextField
                variant="outlined"
                label="Start Date"
                value={startDate}
                onChange={handleTextFieldChange(setStartDate)}
              />
            </div>
          </div>
          <div className="u-display-flex u-alignItems-center u-padding-lg u-no-padding-top u-justifyContent-flexEnd">
            <Button
              size="medium"
              variant="contained"
              color="default"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              className="u-margin-left-md"
              size="medium"
              variant="contained"
              color="secondary"
              onClick={handleCreateEmployee}
            >
              Add
            </Button>
          </div>
        </Dialog>
      ) : null}
    </>
  )
}
