import { Router } from 'express';
import * as LoansController from '../controllers/loans.controller';
const router = new Router();

// Get all Posts
router.route('/loans').post(LoansController.get_loans)
router.route('/loan_industries').get(LoansController.get_industries);

export default router