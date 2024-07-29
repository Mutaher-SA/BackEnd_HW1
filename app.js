const express = require('express');
const app = express();

app.use(express.json());

const employees = [
    {
      "id": "1",
      "firstName": "Ahmed",
      "lastName": "Mutaher",
      "EmpID": "123"
    },
    {
      "id": "2",
      "firstName": "Salem",
      "lastName": "Ali",
      "EmpID": "223"
    },
    {
      "id": "3",
      "firstName": "Feras",
      "lastName": "Tariq",
      "EmpID": "333"
    }
  ];

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome Ahmed, The server is waiting...",
    });
});

// getting All employees
app.get("/employees", (req, res) => {
    res.status(200).json(employees);
});

// getting employee by ID
app.get("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
    const employee = employees.find(employees => employees.id === employeeId);
    
    if (employee) {
        res.status(200).json(employee);
    } else {
        res.status(404).send({ message: "Employee not found !!!" });
    }
});

// getting employee by EmpID
app.get("/employees/Empid/:EmpID", (req, res) => {
    const EmpID = req.params.EmpID;
    const employee = employees.find(employees => employees.EmpID === EmpID);
    
    if (employee) {
        res.status(200).json(employee);
    } else {
        res.status(404).send({ message: "Employee not found !!!" });
    }
});

// Adding a new employee
app.post("/employees", (req, res) => {
    const newEmployee = req.body;
    
    if (!newEmployee.id || !newEmployee.firstName || !newEmployee.lastName || !newEmployee.EmpID) {   // must match the structre of Json
        return res.status(400).send({
            message: "Invalid employee data !!!"
        });
    }

    employees.push(newEmployee);
    res.status(201).send({
        message: "Employee added successfully...",
        employee: newEmployee
    });
});

// Del Emp by ID
app.delete("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
    const employeeIndex = employees.find(employees => employees.id === employeeId);
    
    if (employeeIndex !== -1) {
        res.status(200).send({
            message: "Employee deleted successfully...",
        });

    } else {
        res.status(404).send({ message: "Employee not found !!!" });
    }
});

app.listen(5000, () => {
    console.log('Server is running Now on port 5000...');
});
