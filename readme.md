## 📂 โครงสร้าง Directory
/expense-tracker
│── /api-app                 # Backend (Node.js, Express, Google Sheets API)
│   │── /src
│   │   │── /config          # การตั้งค่าต่างๆ เช่น Google Sheets, Firebase, Redis
│   │   │── /controllers     # ควบคุมการทำงานของ API
│   │   │── /routes          # กำหนดเส้นทาง API
│   │   │── /services        # จัดการกับ Google Sheets API, Firestore, Redis
│   │   │── /models          # Schema ของข้อมูล
│   │   │── /middlewares     # Middleware เช่น Auth, Logging
│   │   │── /utils           # Helper Functions
│   │   │── app.ts           # ตั้งค่า Express App
│   │   │── server.ts        # เริ่มต้นเซิร์ฟเวอร์
│   │── package.json
│   │── tsconfig.json        # ตั้งค่า TypeScript
│
│── /nuxt-app                # Frontend (Nuxt 3, Pinia, Tailwind CSS)
│   │── /components          # UI Components เช่น ปุ่ม, ฟอร์ม, ตาราง
│   │── /layouts             # Layout หลัก เช่น MainLayout
│   │── /pages               # หน้าหลัก /dashboard /transactions
│   │── /stores              # Pinia Store จัดการสถานะข้อมูล
│   │── /utils               # Utility functions
│   │── /styles              # Tailwind CSS Custom Style
│   │── nuxt.config.ts       # ตั้งค่า Nuxt 3
│   │── package.json
│   │── tsconfig.json
│
│── /docs                    # เอกสาร API และ ERD
│── README.md                # คำอธิบายโปรเจกต์
