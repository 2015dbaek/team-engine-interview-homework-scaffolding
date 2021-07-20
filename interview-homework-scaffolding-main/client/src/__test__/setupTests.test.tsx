// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
//import React from 'react';
//import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { App } from '../app';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

  describe("loadEmployeesButton", () => {
    test("button text content", () => {
      render(<App />);
      var loadEmployeesButton = screen.getByTestId("loadEmployeesButtonTest");
      expect(loadEmployeesButton).toHaveTextContent("Load Employees");
    });

    test("test table contents after load employees is clicked", async () => {
      render(<App />);
      var loadEmployeesButton = screen.getByTestId("loadEmployeesButtonTest");
      expect(loadEmployeesButton).toHaveTextContent("Load Employees");
      fireEvent.click(loadEmployeesButton);
      await waitFor(() => {
        expect(screen.getByTestId("loadEmployeesDialogueTest")).toBeTruthy();
        expect(screen.getByRole("table")).toBeTruthy();
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[0].textContent).toEqual("1");
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[1].textContent).toEqual("Jim");
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[2].textContent).toEqual("Manning");
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[3].textContent).toEqual("nef@souro.tm");
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[4].textContent).toEqual("(571) 734-9828");
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[5].textContent).toEqual("MIS Manager");
        expect(screen.getByRole("table").querySelector("tbody")!.children[0].children[6].textContent).toEqual("2019-10-09T06:15:12.324Z");
      });
    });
  });

  describe("loadEmployeeButton", () => {
    test("button text content", () => {
      render(<App />);
      const loadEmployeeButton = screen.getByTestId("loadEmployeeButtonTest");
      expect(loadEmployeeButton).toHaveTextContent("Load Single Employee");
    });
    test("Test call of loading employee id = 1", async () => {
      render(<App />);
      var loadEmployeeButton = screen.getByTestId("loadEmployeeButtonTest");
      expect(loadEmployeeButton).toHaveTextContent("Load Single Employee");
      fireEvent.click(loadEmployeeButton);
      await waitFor(() => {
        expect(screen.getByTestId("searchEmployeeTitle")).toHaveTextContent("Search Employee by ID or First/Last Name");
      });
      fireEvent.change(screen.getByTestId("searchEmployeeTest").getElementsByTagName("input")[0], { target: { value: "1" } });
      fireEvent.click(screen.getByTestId("testSingleEmployeeSearchButton"));
      await waitFor(() => {
        expect(screen.getByTestId("employeeNameTest")).toHaveTextContent("Jim Manning");
        expect(screen.getByTestId("employeeIdTest")).toHaveTextContent("1");
        expect(screen.getByTestId("employeeEmailTest")).toHaveTextContent("nef@souro.tm");
        expect(screen.getByTestId("employeePhoneNumberTest")).toHaveTextContent("(571) 734-9828");
        expect(screen.getByTestId("employeeJobTitleTest")).toHaveTextContent("MIS Manager");
        expect(screen.getByTestId("employeeStartDateTest")).toHaveTextContent("2019-10-09");
        expect(screen.getByTestId("employeeGroupsTest")).toHaveTextContent("Sales, Office");
      });
    });
    test("test loading messages", async () => {
      render(<App />);
      var loadEmployeeButton = screen.getByTestId("loadEmployeeButtonTest");
      expect(loadEmployeeButton).toHaveTextContent("Load Single Employee");
      fireEvent.click(loadEmployeeButton);
      await waitFor(() => {
        expect(screen.getByTestId("searchEmployeeTitle")).toHaveTextContent("Search Employee by ID or First/Last Name");
      });
      fireEvent.change(screen.getByTestId("searchEmployeeTest").getElementsByTagName("input")[0], { target: { value: "1" } });
      fireEvent.click(screen.getByTestId("testSingleEmployeeSearchButton"));
      await waitFor(() => {
        expect(screen.getByTestId("messagesButtonTest")).toHaveTextContent("Load Employee Messages");
      });
      fireEvent.click(screen.getByTestId("messagesButtonTest"));
      await waitFor(() => {
        expect(screen.queryByText("Good morning Jim! We were informed me that you called off today. First, I hope you're well. Second, can you let us know why? Unfortunately, during the pandemic, I feel obligated to ask...")).toBeTruthy();
      });
    });
  });
  describe("addEmployeeButton", () => {
    test("button text content", () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        expect(addEmployeeButton).toHaveTextContent("Add Employee +");
    });
    
    test("input field labels", async () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        fireEvent.click(addEmployeeButton);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeDialogueTest")).toBeTruthy();
            expect(screen.getByTestId("inputFirstNameTest").getElementsByTagName("label")[0]).toHaveTextContent("First Name");
            expect(screen.getByTestId("inputLastNameTest").getElementsByTagName("label")[0]).toHaveTextContent("Last Name");
            expect(screen.getByTestId("inputEmailTest").getElementsByTagName("label")[0]).toHaveTextContent("Email");
        });
    });
    
    test("submitting empty", async () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        fireEvent.click(addEmployeeButton);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeDialogueTest")).toBeTruthy();
            const addEmployeeButtonFinal = screen.getByTestId("addEmployeeButtonFinal");
            fireEvent.click(addEmployeeButtonFinal);
            expect(screen.getByTestId("addEmployeeResponse")).toHaveTextContent("Need a first name");
        });
    });
    
    test("submitting only first name", async () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        fireEvent.click(addEmployeeButton);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeDialogueTest")).toBeTruthy();
            expect(screen.getByTestId("inputFirstNameTest")).toBeTruthy();
            fireEvent.change(screen.getByTestId("inputFirstNameTest").getElementsByTagName("input")[0], { target: { value: 'Joe' } }); 
        });            
        const addEmployeeButtonFinal = screen.getByTestId("addEmployeeButtonFinal");
        fireEvent.click(addEmployeeButtonFinal);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeResponse")).toHaveTextContent("Need a last name");
        });
    });
    
    test("submitting first and last name", async () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        fireEvent.click(addEmployeeButton);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeDialogueTest")).toBeTruthy();
            expect(screen.getByTestId("inputFirstNameTest")).toBeTruthy();
            fireEvent.change(screen.getByTestId("inputFirstNameTest").getElementsByTagName("input")[0], { target: { value: 'Joe' } }); 
            fireEvent.change(screen.getByTestId("inputLastNameTest").getElementsByTagName("input")[0], { target: { value: 'Doe' } }); 
        });
        const addEmployeeButtonFinal = screen.getByTestId("addEmployeeButtonFinal");
        fireEvent.click(addEmployeeButtonFinal);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeResponse")).toHaveTextContent("Need an email");
        });
    });
    
    test("submitting first, last, email twice", async () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        fireEvent.click(addEmployeeButton);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeDialogueTest")).toBeTruthy();
            expect(screen.getByTestId("inputFirstNameTest")).toBeTruthy();
        });
        fireEvent.change(screen.getByTestId("inputFirstNameTest").getElementsByTagName("input")[0], {target:{value: 'Joe'}}); 
        fireEvent.change(screen.getByTestId("inputLastNameTest").getElementsByTagName("input")[0], {target:{value: 'Doe'}}); 
        fireEvent.change(screen.getByTestId("inputEmailTest").getElementsByTagName("input")[0], {target:{value:'joe@doe.com'}}); 
        fireEvent.change(screen.getByTestId("inputPhoneNumberTest").getElementsByTagName("input")[0], {target:{value: 'joe@doe.com'}}); 
        const addEmployeeButtonFinal = screen.getByTestId("addEmployeeButtonFinal");
        fireEvent.click(addEmployeeButtonFinal);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeResponse")).toHaveTextContent("Successfully added employee");
        });
        
        // fill in and attempt to submit again
        fireEvent.change(screen.getByTestId("inputFirstNameTest").getElementsByTagName("input")[0], {target:{value: 'Joe'}}); 
        fireEvent.change(screen.getByTestId("inputLastNameTest").getElementsByTagName("input")[0], {target:{value: 'Doe'}}); 
        fireEvent.change(screen.getByTestId("inputEmailTest").getElementsByTagName("input")[0], {target:{value:'joe@doe.com'}}); 
        fireEvent.change(screen.getByTestId("inputPhoneNumberTest").getElementsByTagName("input")[0], {target:{value: 'joe@doe.com'}}); 
        fireEvent.click(addEmployeeButtonFinal);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeResponse")).toHaveTextContent("Employee Already Exists!");
        });
    });
});

describe("addAndLoad", () => {
    test("add and load", async () => {
        render(<App />);
        const addEmployeeButton = screen.getByTestId("addEmployeeButtonTest");
        fireEvent.click(addEmployeeButton);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeDialogueTest")).toBeTruthy();
            expect(screen.getByTestId("inputFirstNameTest")).toBeTruthy();
            fireEvent.change(screen.getByTestId("inputFirstNameTest").getElementsByTagName("input")[0], { target: { value: 'John' } }); 
            fireEvent.change(screen.getByTestId("inputLastNameTest").getElementsByTagName("input")[0], { target: { value: 'Doe' } }); 
            fireEvent.change(screen.getByTestId("inputEmailTest").getElementsByTagName("input")[0], { target: { value: 'john@doe.com' } }); 
            fireEvent.change(screen.getByTestId("inputPhoneNumberTest").getElementsByTagName("input")[0], { target: { value: '(111) 111-1111' } }); 
            fireEvent.change(screen.getByTestId("inputJobTitleTest").getElementsByTagName("input")[0], { target: { value: 'Software Developer Intern' } }); 
            fireEvent.change(screen.getByTestId("inputStartDateTest").getElementsByTagName("input")[0], { target: { value: '2019-10-09T06:15:12.324Z' } }); 
        });
        const addEmployeeButtonFinal = screen.getByTestId("addEmployeeButtonFinal");
        fireEvent.click(addEmployeeButtonFinal);
        await waitFor(() => {
            expect(screen.getByTestId("addEmployeeResponse")).toHaveTextContent("Successfully added employee");
        });
        const testCancelAddEmployeeButton = screen.getByTestId("testCancelAddEmployeeButton");
        fireEvent.click(testCancelAddEmployeeButton);
        // close add employee dialogue
        await waitFor(() => {
            expect(screen.queryByTestId("addEmployeeDialogueTest")).toBeFalsy();
        });
        
        // load employee table
        var loadEmployeesButton = screen.getByTestId("loadEmployeesButtonTest");
        expect(loadEmployeesButton).toHaveTextContent("Load Employees");
        fireEvent.click(loadEmployeesButton);
        await waitFor(() => {
            expect(screen.getByTestId("loadEmployeesDialogueTest")).toBeTruthy();
            expect(screen.getByRole("table")).toBeTruthy();
            const numEmployees = screen.getByRole("table").querySelector("tbody")!.children.length;
            const employeeTableRow = screen.getByRole("table").querySelector("tbody")!.children[numEmployees - 1];
            expect(employeeTableRow.children[0].textContent).toEqual(numEmployees + "");
            expect(employeeTableRow.children[1].textContent).toEqual("John");
            expect(employeeTableRow.children[2].textContent).toEqual("Doe");
            expect(employeeTableRow.children[3].textContent).toEqual("john@doe.com");
            expect(employeeTableRow.children[4].textContent).toEqual("(111) 111-1111");
            expect(employeeTableRow.children[5].textContent).toEqual("Software Developer Intern");
            expect(employeeTableRow.children[6].textContent).toEqual("2019-10-09T06:15:12.324Z");
        });
    });
});