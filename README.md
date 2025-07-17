# Getting Started

This project consists of two parts: the **Frontend** and the **Backend**. Follow the steps below to get everything set up and running locally.

## 📦 Prerequisites

- [Python 3.x](https://www.python.org/downloads/)
- npm

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git https://github.com/Lavan-Nithi/MyChoiceTask.git
cd MyChoiceTask
```

---

### 2. Backend Setup

Navigate to the backend directory and set up a virtual environment:

```bash
cd items_backend
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

Install the required dependencies:

```bash
pip3 install -r requirements.txt
```

Run the backend server:

```bash
python3 manage.py runserver
```

---

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../items_frontend
npm install
npm run dev
```

---
