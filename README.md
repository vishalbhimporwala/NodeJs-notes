# 📝 Notes App - Node.js Backend

## 📌 Overview
The **Notes App Backend** is built using **Node.js, Express, and MongoDB** to handle user authentication and notes management. It provides RESTful API endpoints for seamless interaction with the Flutter frontend.

---

## 🛠️ Installation & Setup
### 1️⃣ Prerequisites
- Install **Node.js** (Latest LTS) - [Download Node.js](https://nodejs.org/)
- Install **MongoDB** - [Download MongoDB](https://www.mongodb.com/try/download/community)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/vishalbhimporwala/NodeJs-notes.git
cd NodeJs-notes
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
PORT=3025
DB_PATH=mongodb://localhost:27017/notesdb
JWT_SECRET=your_jwt_secret_key
```

### 5️⃣ Start the Server
```sh
npm start
```
For development mode with auto-restart, use:
```sh
npm install -g nodemon
nodemon index.js
```

---

## 📡 API Endpoints
### 🔑 Authentication
- **Register:** `POST /api/v1/user/register`
- **Login:** `POST /api/v1/user/login`

### 📝 Notes Management
- **Create Note:** `POST /api/v1/note/create`
- **Update Note:** `POST /api/v1/note/update`
- **Fetch Notes:** `GET /api/v1/note/fetch`
- **Delete Note:** `DELETE /api/v1/note/delete/{noteId}`

---

## 🚀 Deployment
To deploy on **Heroku**, **Vercel**, or **AWS**, make sure to:
- Use an **external MongoDB database** (e.g., MongoDB Atlas)
- Set **CORS policies** for secure access

---

## 📜 License
This project is **open-source** and free to use.

---

## ✨ Author
**Vishal Bhimporwala**  
🚀 GitHub: [@vishalbhimporwala](https://github.com/vishalbhimporwala)