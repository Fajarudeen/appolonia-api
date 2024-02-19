import express from 'express';
import { createEmployee, deleteEmployee, getEmployeeById, updateEmployee } from '../../../controllers/dashboard/EmployeeController.js';
import { getEmployeeTable } from '../../../controllers/dashboard/data-table/employeeTableController.js';

export const employeeRouter = express.Router();

employeeRouter.post('/create', createEmployee);

employeeRouter.get('/employees-table', getEmployeeTable);

employeeRouter.get('/view/:id', getEmployeeById);

employeeRouter.put('/update/:id', updateEmployee);

employeeRouter.delete('/delete/:id', deleteEmployee);