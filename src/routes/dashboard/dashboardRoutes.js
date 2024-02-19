import express from 'express';
import { departmentRouter } from './routes/departmentRouter.js';
import { employeeRouter } from './routes/employeeRouter.js';

export const dashboardRouter = express.Router();


dashboardRouter.use('/departments', departmentRouter);

dashboardRouter.use('/employees', employeeRouter);