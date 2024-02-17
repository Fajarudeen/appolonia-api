import express from 'express';
import { createFaq, deleteFaq, getFaqById, updateFaq } from '../../controllers/dashboard/faqController.js';
import { getFaqTable } from '../../controllers/dashboard/data-table/faqTableController.js';

export const faqRouter = express.Router();

faqRouter.post('/', createFaq);

faqRouter.get('/', getFaqTable);

faqRouter.get('/:id', getFaqById);

faqRouter.put('/:id', updateFaq);

faqRouter.delete('/:id', deleteFaq);