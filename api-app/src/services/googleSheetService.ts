// backend/src/services/googleSheetService.ts
import { sheets, spreadsheetId } from '../config/googleConfig';

interface Expense {
  id?: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
}

class GoogleSheetService {
  // ชื่อของชีทที่เราจะใช้งาน (เช่น "Expenses")
  private sheetName = 'Expenses';

  /**
   * ดึงข้อมูลรายรับรายจ่ายทั้งหมด
   */
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${this.sheetName}!A2:F`, // ข้อมูลเริ่มจากแถวที่ 2 (หลังหัวตาราง)
      });

      const rows = response.data.values || [];
      console.log('test ระบบ',response)
      return rows.map((row, index) => ({
        id: (index + 2).toString(), // ใช้เลขแถวเป็น ID
        date: row[0],
        category: row[1],
        amount: parseFloat(row[2]),
        description: row[3],
        type: row[4] as 'income' | 'expense'
      }));
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw new Error('Failed to fetch expenses data');
    }
  }

  /**
   * เพิ่มรายการรายรับรายจ่ายใหม่
   */
  async addExpense(expense: Expense): Promise<Expense> {
    try {
      // เตรียมข้อมูลสำหรับเพิ่มลงใน sheet
      const values = [
        [
          expense.date,
          expense.category,
          expense.amount.toString(),
          expense.description,
          expense.type
        ]
      ];

      // เพิ่มข้อมูลลงใน sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${this.sheetName}!A:E`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      // ดึงข้อมูลที่เพิ่งเพิ่มล่าสุดเพื่อรับ ID
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${this.sheetName}!A:E`, 
      });

      const rowCount = response.data.values?.length || 0;
      
      return {
        ...expense,
        id: rowCount.toString()
      };
    } catch (error) {
      console.error('Error adding expense to Google Sheets:', error);
      throw new Error('Failed to add expense');
    }
  }

  /**
   * อัปเดตรายการรายรับรายจ่าย
   */
  async updateExpense(id: string, expense: Expense): Promise<Expense> {
    try {
      const rowIndex = parseInt(id);
      const values = [
        [
          expense.date,
          expense.category,
          expense.amount.toString(),
          expense.description,
          expense.type
        ]
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${this.sheetName}!A${rowIndex}:E${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      return {
        ...expense,
        id
      };
    } catch (error) {
      console.error('Error updating expense in Google Sheets:', error);
      throw new Error('Failed to update expense');
    }
  }

  /**
   * ลบรายการรายรับรายจ่าย
   */
  async deleteExpense(id: string): Promise<boolean> {
    try {
      const rowIndex = parseInt(id);
      
      // ในการลบข้อมูลใน Google Sheets เราจะใช้วิธีล้างข้อมูลในแถวนั้น
      await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${this.sheetName}!A${rowIndex}:E${rowIndex}`,
      });

      return true;
    } catch (error) {
      console.error('Error deleting expense from Google Sheets:', error);
      throw new Error('Failed to delete expense');
    }
  }

  /**
   * ดึงข้อมูลสรุปรายรับรายจ่าย
   */
  async getSummary(): Promise<{totalIncome: number, totalExpense: number}> {
    try {
      const expenses = await this.getAllExpenses();
      
      const totalIncome = expenses
        .filter(e => e.type === 'income')
        .reduce((sum, e) => sum + e.amount, 0);
        
      const totalExpense = expenses
        .filter(e => e.type === 'expense')
        .reduce((sum, e) => sum + e.amount, 0);

      return {
        totalIncome,
        totalExpense
      };
    } catch (error) {
      console.error('Error calculating summary:', error);
      throw new Error('Failed to calculate summary');
    }
  }
}

export default new GoogleSheetService();