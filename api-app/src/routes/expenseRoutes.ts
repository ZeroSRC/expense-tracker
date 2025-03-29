// backend/src/routes/expenseRoutes.ts
import express from 'express';
import expenseController from '../controllers/expenseController';

const router = express.Router();

// เส้นทาง API สำหรับการจัดการข้อมูลรายรับรายจ่าย
router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.addExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);
router.get('/summary', expenseController.getSummary);

export default router;