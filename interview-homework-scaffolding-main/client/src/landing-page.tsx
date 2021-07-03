import React from 'react';

import { AddEmployeeButton } from './add-employee-button';
import { LoadEmployeesButton } from './load-employee-button';


export const LandingPage = () => {
  return (
    <div className="u-display-flex u-flexGrow-1 u-overflow-hidden u-position-relative">
     <div className="u-width-100% u-overflowY-auto u-padding-xl">
       <h3>Welcome!</h3>
       <div>
         This is the Team Engine interview homework starter project! This project's setup closely mirrors the set up of the web project we use with our customers. The README for this project also includes more detailed information about the project setup and the technology we use, so be sure to read through it.
       </div>
       <div className="u-padding-top-md">
         We have implemented one part of prompt to get you started - the add new employee button. Here is that component:
       </div>
       <AddEmployeeButton />
       <div className="u-padding-top-md">
         We also demonstrated how to make a get request with this button. It will load the employees from the server and log them to the console:
       </div>
       <LoadEmployeesButton />
     </div>
    </div>
  );
};
