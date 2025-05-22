# 🛒 Full-Stack E-commerce Platform

A high-performance, full-featured e-commerce web application built with modern technologies like React 19, Express.js, MongoDB, and Stripe. This platform supports product listings, user authentication, shopping cart management, order processing, and secure online payments.

---

## 🛠️ Key Features

- 🛍️ Product Catalog & Search
- 👥 User Registration & Authentication (JWT)
- 🛒 Shopping Cart with Zustand
- 💳 Stripe Payment Integration
- 📦 Order History & Tracking
- 🖼️ Image Uploads via Cloudinary
- 📊 Admin Dashboard with Recharts
- 🎉 Celebratory Confetti Effects on Checkout
- 🔥 Real-time Toast Notifications

---

## 🧩 UI & UX Enhancements

- **Framer Motion** for rich animations  
- **Lucide React** icons for a clean, consistent interface  
- **React Hot Toast** for dynamic feedback  
- **Recharts** to visualize sales, traffic, and customer data

---

## 🚀 Tech Stack

**Frontend**  
- React 19  
- React Router DOM  
- Zustand (State Management)  
- Axios (API requests)  
- Framer Motion (Animations)  
- Lucide React (Icon Library)  
- Recharts (Analytics & Data Visualization)  
- React Confetti  
- React Hot Toast (Notifications)  

**Backend**  
- Node.js & Express  
- MongoDB & Mongoose  
- JWT (Authentication)  
- bcryptjs (Password hashing)  
- cookie-parser (Session handling)  
- dotenv (Environment config)  
- ioredis (Caching, Rate Limiting)  
- Stripe (Payments)  
- Cloudinary (Image Upload & Management)

---

## 🔐 Environment Variables

In the `server/` directory, create a `.env` file with the following:

```env
PORT = 5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
UPSTASH_REDIS_URL=your_redis_connection_url

ACCESS_TOKEN_SECRET = your_access_token_secret 
REFRESH_TOKEN_SECRET = your_refresh_token_secret
```

## 📂 Folder Structure

```
ecommerce-platform/
├── frontend/            # React frontend
│   ├── src/
│   └── public/
│
├── backend/            # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── lib/
│
└── .env
```




## License 📜

MIT License

Copyright (c) 2025 Mohammed Maaz Rayeen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---
