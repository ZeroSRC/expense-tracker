// backend/src/controllers/expenseController.ts
import { Request, Response } from 'express';
import googleSheetService from '../services/googleSheetService';

class ExpenseController {
  /**
   * ดึงข้อมูลรายรับรายจ่ายทั้งหมด
   */
  getAllExpenses = async (req: Request, res: Response) => {
    try {
      const expenses = await googleSheetService.getAllExpenses();
      return res.status(200).json({ success: true, data: expenses });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * เพิ่มรายการรายรับรายจ่ายใหม่
   */
  addExpense = async (req: Request, res: Response) => {
    try {
      const { date, category, amount, description, type } = req.body;
      
      if (!date || !category || !amount || !type) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please provide date, category, amount, and type' 
        });
      }

      const newExpense = await googleSheetService.addExpense({
        date,
        category,
        amount: parseFloat(amount),
        description: description || '',
        type
      });

      return res.status(201).json({ success: true, data: newExpense });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * อัปเดตรายการรายรับรายจ่าย
   */
  updateExpense = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { date, category, amount, description, type } = req.body;
      
      if (!date || !category || !amount || !type) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please provide date, category, amount, and type' 
        });
      }

      const updatedExpense = await googleSheetService.updateExpense(id, {
        date,
        category,
        amount: parseFloat(amount),
        description: description || '',
        type
      });

      return res.status(200).json({ success: true, data: updatedExpense });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * ลบรายการรายรับรายจ่าย
   */
  deleteExpense = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await googleSheetService.deleteExpense(id);
      return res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * ดึงข้อมูลสรุปรายรับรายจ่าย
   */
  getSummary = async (req: Request, res: Response) => {
    try {
      const summary = await googleSheetService.getSummary();
      return res.status(200).json({ success: true, data: summary });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}

export default new ExpenseController();