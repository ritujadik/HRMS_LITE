from fastapi import FastAPI
from .database import Base, engine
from .routers import employees, attendance
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os


DATABASE_URL = os.getenv("DATABASE_URL")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(employees.router)
app.include_router(attendance.router)


@app.get("/")
def root():
    return {"status": "API is running 🚀"}