from fastapi import APIRouter, Depends
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
def mark_attendance(
    data: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    record = models.Attendance(**data.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


# 2. Get all attendance
@router.get("/all")
def get_all_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()


# 3. Get attendance for one employee
@router.get("/employee/{employee_id}")
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
