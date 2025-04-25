# 📊 CryptoDash

**CryptoDash** is a dynamic cryptocurrency dashboard built as part of INFT 2201 – Winter 2025. It aggregates real-time data from multiple public APIs and displays it in a beautiful, responsive dashboard using React, Bootstrap, and animated components.

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Usage](#-api-usage)
- [Screenshots](#-screenshots)
- [Author](#-author)
- [License](#-license)

---

## 🛠 Introduction

CryptoDash is designed to help users visualize and track real-time cryptocurrency market data by aggregating info from at least four public APIs. The app is fully containerized using Docker Compose for seamless development and deployment.

---

## 🚀 Features

- 🔄 Live data from **CoinGecko** and **CoinCap** APIs
- 📊 Price, market cap, and 24h change tables
- 🎨 Responsive Bootstrap UI with custom theming
- ✨ Framer Motion animations
- 🐳 Docker Compose setup for easy orchestration

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/) (for cloning the repo)

---

## 🧪 Running the Application

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

2. **Run with Docker Compose**
```bash
docker-compose up --build
```

3. **Access the App**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api/crypto-summary](http://localhost:5000/api/crypto-summary)

---

## 🗂 Project Structure

```
/crypto-dashboard
│
├── frontend/         # React + Bootstrap frontend
├── backend/          # Express.js backend
└── docker-compose.yml
```

---

## 📡 API Usage

### `/api/crypto-summary`

Aggregates data from multiple crypto APIs and returns JSON like:
```json
{
  "coingecko": [...],
  "coincap": [...]
}
```

---

## 📸 Screenshots

> Add screenshots here using drag-and-drop on GitHub or markdown:
> `![Dashboard](screenshots/dashboard.png)`

---

## 👨‍💻 Author

**Aryan Panchal**  
Student – INFT 2201  
Durham College – Winter 2025  
[Portfolio (optional)](https://your-portfolio-link.com)

---

## 📝 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for more information.
