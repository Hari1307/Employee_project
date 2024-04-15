// in controllers we will be writing all the backend logic to hide the implementation from the routes

const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ "message": "No Employees found in DB" });
    res.json(employees);
};

const getEmployeeById = async (req, res) => {
    console.log(req.params);
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "Employee Id parameter is required" });
    }
    // const id = parseInt(req.params.id);

    const employee = await Employee.findOne({ _id: req.params.id }).exec();

    if (!employee) {
        return res.status(204).json({ "message": `employee with id ${id} is not found` });
    }
    res.json(employee);
};

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(204).json({ "message": "firstname and lastname are required to create an employee." });
    }

    try {
        const newEmployee = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(201).json(newEmployee);
    }
    catch (err) {
        console.log(err);
    }
};

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "Employee Id parameter is required" });
    }

    // await Employee.findOne({ _id: req.body.id }); // we can also use this approach to fetch the sprcific data from the document :

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(204).json({ "message": `employee with id ${id} is not found` });
    }

    // const updatedEmployees = data.employees.map(employee => {
    //     if (employee.id === id) {
    //         return {
    //             id: id,
    //             firstname: req.body.firstname,
    //             lastname: req.body.lastname
    //         };
    //     }
    //     return employee;
    // })

    if (req.body?.firstname) {
        employee.firstname = req.body.firstname;
    }
    if (req.body?.lastname) {
        employee.lastname = req.body.lastname;
    }
    const result = await employee.save();
    console.log("Employee Details are updated")
    res.json(result);
};

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "Employee Id is required" });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    // const employee = data.employees.findIndex(employee => employee.id === id);
    if (!employee) {
        return res.status(204).json({ "message": `employee with id ${req.body.id} is not found` });
    }

    const result = await employee.deleteOne();
    console.log("Employee is deleted");
    res.json(result);
};

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeeById }
