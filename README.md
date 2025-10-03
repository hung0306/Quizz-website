# Quizz Application

Ứng dụng quiz trực tuyến được xây dựng với React + TypeScript và Node.js backend.

## 🚀 Cách chạy dự án

### Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### 1. Khởi động Backend

```bash
cd backend
npm install
npm start
```

Backend sẽ chạy trên `http://localhost:3000`

### 2. Khởi động Frontend

```bash
cd frontend
npm install
npm start
```

Frontend sẽ chạy trên `http://localhost:3001`

## 🛠️ Công nghệ sử dụng

### Frontend

- **React 18** với TypeScript
- **React Router** cho routing
- **Redux** cho state management
- **Ant Design** cho UI components
- **SCSS** cho styling

### Backend

- **Node.js** với Express
- **MongoDB** (hoặc database khác)
- **RESTful API**

## 📁 Cấu trúc dự án

```
Quizz/
├── frontend/          # React TypeScript app
│   ├── src/
│   │   ├── Components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── helpers/       # Helper functions
│   │   ├── actions/       # Redux actions
│   │   ├── reducers/      # Redux reducers
│   │   └── routes/        # Route definitions
│   └── public/
└── backend/           # Node.js API
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   └── config/        # Configuration
    └── package.json
```

## 🔧 Tính năng chính

- ✅ Đăng ký/Đăng nhập người dùng
- ✅ Quản lý chủ đề quiz
- ✅ Làm bài quiz với nhiều lựa chọn
- ✅ Xem kết quả và lịch sử làm bài
- ✅ Giao diện responsive
- ✅ TypeScript cho type safety

## 🐛 Khắc phục sự cố

### Lỗi kết nối API

- Đảm bảo backend đang chạy trên port 3000
- Kiểm tra file `frontend/src/utils/request.ts` có đúng API_DOMAIN

### Lỗi TypeScript

- Chạy `npm run build` để kiểm tra lỗi TypeScript
- Đảm bảo tất cả dependencies đã được cài đặt

### Lỗi WebSocket

- Lỗi WebSocket thường đến từ browser extensions, không ảnh hưởng đến ứng dụng

## 📝 Ghi chú

- Dự án đã được chuyển đổi hoàn toàn sang TypeScript
- Tất cả components đều có type definitions
- Error handling đã được cải thiện
- Code được tối ưu cho development và production
