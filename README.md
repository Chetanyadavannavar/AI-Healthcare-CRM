# 🏥 AI Healthcare CRM

An AI-powered Healthcare Customer Relationship Management (CRM) system built using **React**, **FastAPI**, **PostgreSQL**, **LangGraph**, and **Groq LLM**. This application helps pharmaceutical field representatives manage Healthcare Professional (HCP) interactions and generate AI-driven insights.

---

## 🚀 Features

### 🔐 Authentication
- User Login
- User Signup
- Logout
- Session Management using Local Storage

### 📊 Dashboard
- Total Doctors
- Total Interactions
- Positive, Neutral & Negative Sentiment Count
- Sentiment Analysis Chart
- Top Doctors Chart
- AI Insights
- AI Interaction Assistant

### 👨‍⚕️ Doctor Management
- Add Doctor
- View Doctor Profile
- Delete Doctor
- Search Doctor
- Responsive Doctor Cards

### 🤖 AI Interaction Assistant
- Select Healthcare Professional
- Enter Meeting Notes
- AI Generated Summary
- Sentiment Analysis
- Follow-up Recommendation
- Save Interaction to Database

### 📜 Interaction History
- View Previous AI Analyses
- Search by Doctor Name
- Display Summary
- Display Sentiment
- Display Follow-up Suggestions

---

# 🧠 AI Workflow

The application uses **LangGraph** with **Groq Gemma2-9B-IT** to process doctor interactions.

### AI Flow

```
User
   │
   ▼
Enter Interaction Notes
   │
   ▼
FastAPI Backend
   │
   ▼
LangGraph Agent
   │
   ▼
Groq LLM (Gemma2-9B-IT)
   │
   ├── Generate Summary
   ├── Detect Sentiment
   ├── Generate Follow-up
   ▼
Store Result in PostgreSQL
   │
   ▼
React Dashboard
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- Bootstrap Icons
- React Toastify
- Chart.js
- CSS3

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

---

## Database

- PostgreSQL

---

## AI Technologies

- LangGraph
- Groq API
- Gemma2-9B-IT Model
- Llama-3.3-70B (Supported)

---

# 📁 Project Structure

```
AI-Healthcare-CRM
│
├── Backend
│   ├── app
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routers
│   │   ├── services
│   │   └── ai_agent.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# ⚙ Installation

## Backend

```bash
cd Backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Doctors

| Method | Endpoint | Description |
|----------|----------------|----------------|
| GET | /doctors | Get all doctors |
| POST | /doctors | Add doctor |
| GET | /doctors/{id} | Doctor profile |
| DELETE | /doctors/{id} | Delete doctor |

---

## Interactions

| Method | Endpoint |
|---------|----------|
| POST | /interactions |
| GET | /interactions |

---

## Dashboard

| Method | Endpoint |
|----------|-----------|
| GET | /dashboard |

---

## AI Assistant

| Method | Endpoint |
|----------|-----------|
| POST | /assistant |

---

# 🤖 LangGraph Tools

The AI Agent uses multiple tools:

- Log Interaction
- Edit Interaction
- Summarize Meeting
- Sentiment Analysis
- Follow-up Recommendation
- Doctor Search
- Interaction History Retrieval

---

# 🎯 Future Improvements

- JWT Authentication
- Role-Based Access Control
- File Uploads
- Voice-to-Text Interaction
- Chat Interface with AI
- Appointment Scheduling
- Email Notifications
- Docker Deployment
- Cloud Hosting

---

# 📷 Screenshots

### Login

(Add Screenshot)

### Dashboard

(Add Screenshot)

### Doctors

(Add Screenshot)

### AI Interaction Assistant

(Add Screenshot)

### History

(Add Screenshot)

---

# 👨‍💻 Developed By

**Chetan Appasab Yadavannavar**

Electronics and Communication Engineering

Python Full Stack Developer

---

# ⭐ GitHub Repository

https://github.com/Chetanyadavannavar/AI-Healthcare-CRM

---

# 📄 License

This project is developed for educational and technical assessment purposes.
