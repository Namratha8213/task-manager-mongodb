# 📝 Task Manager App (MERN Stack)

A full-stack **Task Manager** application built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to create, read, update, and delete tasks seamlessly.

## 🚀 Live Deployment Links

- **Frontend (Vercel):** [Task Manager App](https://task-manager-mongodb-54c77hijd-namratha-s-projects-0821a31d.vercel.app/)
- **Backend (Render):** [Task Manager API](https://task-manager-mongodb-alek.onrender.com/)

## 📌 Features

✅ **Create, Read, Update, and Delete (CRUD) tasks**  
✅ **Mark tasks as complete/incomplete**  
✅ **Responsive UI with React**  
✅ **RESTful API with Express.js**  
✅ **MongoDB for database storage**  
✅ **Frontend deployed on Vercel**  
✅ **Backend deployed on Render**

---

## 🛠️ Technologies Used

### **Frontend:**

- React.js (Hooks & Functional Components)
- React Router for navigation
- Axios for API requests
- Tailwind CSS (or your preferred styling)

### **Backend:**

- Node.js & Express.js
- MongoDB (with Mongoose ORM)
- dotenv for environment variables
- CORS & Middleware
- Hosted on **Render**

---

## 🔧 How to Run Locally

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/your-username/task-manager-mongodb.git
cd task-manager-mongodb
```

### **2️⃣ Setup the Backend**

```bash
cd server
npm install
```

- Create a `.env` file inside the `server` directory and add your MongoDB connection string:
  ```
  MONGO_URI=your_mongodb_connection_string
  FRONTEND_URL=https://task-manager-mongodb-54c77hijd-namratha-s-projects-0821a31d.vercel.app/
  ```
- Start the server:
  ```bash
  npm start
  ```

### **3️⃣ Setup the Frontend**

```bash
cd client
npm install
```

- Create a `.env` file inside the `client` directory and add:
  ```
  REACT_APP_API_BASE_URL=https://task-manager-mongodb-alek.onrender.com/
  ```
- Start the frontend:
  ```bash
  npm start
  ```

---

## 🌟 Contributing

Feel free to fork the repository and submit pull requests. If you find issues, open an issue on GitHub.

### 📜 License

This project is open-source and available under the **MIT License**.
