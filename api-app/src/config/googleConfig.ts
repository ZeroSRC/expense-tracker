// backend/src/config/googleConfig.ts
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

// สร้าง JWT client สำหรับการยืนยันตัวตนกับ Google API
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log("Service Account Email:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log("Private Key (first few chars):", process.env.GOOGLE_PRIVATE_KEY?.substring(0, 20));
// สร้างอินสแตนซ์ของ Google Sheets API client
const sheets = google.sheets({ version: 'v4', auth });

// ID ของ Google Sheet ที่เราจะใช้
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export { auth, sheets, spreadsheetId };