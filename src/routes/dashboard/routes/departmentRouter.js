import express from 'express';
import { createDepartment, deleteDepartment, getDepartmentById, updateDepartment } from '../../../controllers/dashboard/DepartmentController.js';
import { getDepartmentTable } from '../../../controllers/dashboard/data-table/departmentTableController.js';

export const departmentRouter = express.Router();

departmentRouter.post('/create', createDepartment);

departmentRouter.get('/department-table', getDepartmentTable);

departmentRouter.get('/view/:id', getDepartmentById);

departmentRouter.put('/update/:id', updateDepartment);

departmentRouter.delete('/delete/:id', deleteDepartment);