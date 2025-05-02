# 🛒 Full-Stack E-commerce Platform

A high-performance, full-featured e-commerce web application built with modern technologies like React 19, Express.js, MongoDB, and Stripe. This platform supports product listings, user authentication, shopping cart management, order processing, and secure online payments.

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

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

---

## 🔐 Environment Variables

In the `server/` directory, create a `.env` file with the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
REDIS_URL=your_redis_connection_url
```

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

## 📂 Folder Structure

```
ecommerce-platform/
├── client/            # React frontend
│   ├── src/
│   └── public/
│
├── server/            # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│
└── README.md
```

---

## 🧪 Development

Start the **backend**:
```bash
cd server
npm run dev
```

Start the **frontend**:
```bash
cd client
npm run dev
```

---

## 🤝 Contributing

Pull requests, suggestions, and issues are welcome!  
Open an issue or submit a PR in the [GitHub repo](https://github.com/your-username/ecommerce-platform/issues).

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---
