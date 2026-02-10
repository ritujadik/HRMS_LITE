# HRMS Lite

## Project Overview
A simple Human Resource Management System to manage employees and attendance.

## Tech Stack
- Frontend: React, Vite, Axios
- Backend: FastAPI, SQLAlchemy
- Database: SQLite (or PostgreSQL)
- Deployment: Render for backend and frontend

## Live Links
- Frontend: https://hrms-lite-11-3iwg.onrender.com/
- Backend: https://hrms-lite-2-fq3f.onrender.com/docs

## Features
- Add, update, delete employees
- Mark attendance per employee as per the status Present or Absent
- View attendance (employee-wise or all employees)
- Validations for duplicate emails
- Auto-generated employee ID

## Steps to Run Locally
1. Clone the repo
2. Backend:
   ```bash
   cd backend
   python -m venv venv
   pip install -r requirements.txt
   uvicorn app.main:app --reload
