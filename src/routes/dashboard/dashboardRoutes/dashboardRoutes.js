import express from 'express';
import { faqRouter } from '../faqRouter.js';

export const dashboardRouter = express.Router();


dashboardRouter.use('/faqs', faqRouter);