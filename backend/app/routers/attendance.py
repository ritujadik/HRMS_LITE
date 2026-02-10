from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter(prefix="/attendance", tags=["Attendance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 1. Mark attendance
@router.post("/")
def mark_attendance(data: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    record = models.Attendance(**data.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


# 2. Get all attendance
@router.get("/all")
def get_all_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()


# 3. Get attendance for a single employee
@router.get("/employee/{employee_id}")
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()


# Get attendance for a single employee (GET)
@router.get("/employee/{employee_id}")
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
    return records
# Get attendance for one employee (GET)
@router.get("/{employee_id}")
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
    if not records:
        return []  # return empty list instead of 404
    return records
