# Dashwater Backend

Dashwater is an IoT-based water quality monitoring system developed as a group project. This repository contains the backend API and services that power the data ingestion, storage, and communication between IoT devices and the frontend dashboard.

> 🧠 Related frontend repository: [Dashwater Frontend](https://github.com/TaylorJi/Dashwater_frontend)

## 👨‍💻 Team Members

- Nash Baek
- Taylor Ji
- Siwoon Lim
- Ellen Jung

## 🔧 Tech Stack

- **Node.js** with **Express**
- **TypeScript**
- **AWS Timestream** for time-series data storage
- **IoT integration**
- **RESTful API**

## 📁 Project Structure

dashwater_backend/
├── src/
│   ├── controllers/        # API endpoint logic
│   ├── models/             # Data models
│   ├── routes/             # Route definitions
│   ├── services/           # AWS Timestream and business logic
│   └── utils/              # Helper functions
├── .env                    # Environment variables (not committed)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
└── README.md               # Project documentation

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm
- AWS credentials configured for Timestream access

## ⚠️ Service Status

> **Important:** This application is currently **non-operational** because the AWS subscription used during development was a paid service and was terminated after the project's completion. The backend will not respond to data queries or ingestion requests until a new AWS Timestream instance is configured.
