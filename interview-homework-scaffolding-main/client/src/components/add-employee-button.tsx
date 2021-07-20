import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';

import { Api } from '../util/api';

export const AddEmployeeButton = () => {

  const [isAddingEmployee, setIsAddingEmployee] = useState<boolean>(false);
  const [addEmployeeNotification, setAddEmployeeNotification] = useState<string>('');
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
    if (firstName.length === 0) {
        setAddEmployeeNotification("Need a first name");
    } else if (lastName.length === 0) {
      setAddEmployeeNotification("Need a last name");
    } else if (email.length === 0) {
      setAddEmployeeNotification("Need an email");
    } else {
        const employeeAdd = await response.json();
        //how to check if alert shows exist/or added employee?
        if(employeeAdd.error) {
            setAddEmployeeNotification("Employee Already Exists!");
        } else {
            setAddEmployeeNotification("Successfully added employee");
            setFirstName(''); //reset names and empty fields
            setLastName('');
            setNickname('');
            setPhoneNumber('');
            setEmail('');
            setJobTitle('');
            setStartDate('');
            var inputs = document.getElementsByTagName("input");
            for (let i = 0; i < inputs.length ; i++) {
                inputs[i].value = "";
            }
        }
    }
  }

  return (
    <>
      <Button
      data-testid="addEmployeeButtonTest"
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickAddingEmployee}
      >
        Add Employee +
      </Button>
      {isAddingEmployee ? (
        <Dialog open onClose={handleCloseDialog} disableEnforceFocus data-testid="addEmployeeDialogueTest">
          <div className={`u-display-flex u-alignItems-center u-background-primary typo-h6 u-color-white u-padding u-justifyContent-spaceBetween`}>
            <div style={{ width: '24px' }} />
            <div>Add New Employee</div>
            <CloseIcon className="u-cursor-pointer" onClick={handleCloseDialog} />
          </div>
          <div className="u-padding-lg">
            <div className="u-padding">
              <TextField
                data-testid="inputFirstNameTest"
                variant="outlined"
                label="First Name"
                required
                error={firstName.length === 0 ? true : false }
                helperText={firstName.length === 0 ? "This field cannot be empty!" : false}
                value={firstName}
                onChange={handleTextFieldChange(setFirstName)}
              />
            </div>
            <div className="u-padding">
              <TextField
                data-testid="inputLastNameTest"
                variant="outlined"
                label="Last Name"
                required
                error={lastName.length === 0 ? true : false }
                helperText={lastName.length === 0 ? "This field cannot be empty!" : false}
                value={lastName}
                onChange={handleTextFieldChange(setLastName)}
              />
            </div>
            <div className="u-padding">
              <TextField
                data-testid="inputNicknameTest"
                variant="outlined"
                label="Nickname"
                value={nickname}
                onChange={handleTextFieldChange(setNickname)}
              />
            </div>
            <div className="u-padding">
              <TextField
                data-testid="inputPhoneNumberTest"
                variant="outlined"
                label="Phone Number"
                value={phoneNumber}
                onChange={handleTextFieldChange(setPhoneNumber)}
              />
            </div>
            <div className="u-padding">
              <TextField
                data-testid="inputEmailTest"
                variant="outlined"
                label="Email"
                required
                error={email.length === 0 ? true : false }
                helperText={email.length === 0 ? "This field cannot be empty!" : false}
                value={email}
                onChange={handleTextFieldChange(setEmail)}
              />
            </div>
            <div className="u-padding">
              <TextField
                data-testid="inputJobTitleTest"
                variant="outlined"
                label="Job Title"
                value={jobTitle}
                onChange={handleTextFieldChange(setJobTitle)}
              />
            </div>
            <div className="u-padding">
              <TextField
                data-testid="inputStartDateTest"
                variant="outlined"
                label="Start Date"
                value={startDate}
                onChange={handleTextFieldChange(setStartDate)}
              />
            </div>
            <div className="u-padding">
                <div data-testid="addEmployeeResponse">{addEmployeeNotification ? addEmployeeNotification : ""}</div>
            </div>
          </div>
          <div className="u-display-flex u-alignItems-center u-padding-lg u-no-padding-top u-justifyContent-flexEnd">
            <Button
              data-testid="testCancelAddEmployeeButton"
              size="medium"
              variant="contained"
              color="default"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              data-testid="addEmployeeButtonFinal"
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