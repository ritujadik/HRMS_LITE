from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter(prefix="/employees", tags=["Employees"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_employee(data: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    # Check if there is a record with same full_name + email + department
    duplicate_record = db.query(models.Employee).filter(
        models.Employee.full_name == data.full_name,
        models.Employee.email == data.email,
        models.Employee.department == data.department
    ).first()
    if duplicate_record:
        raise HTTPException(status_code=400, detail="Employee record already exists")

    # Check if email already exists for another employee
    email_exists = db.query(models.Employee).filter(
        models.Employee.email == data.email
    ).first()
    if email_exists:
        raise HTTPException(status_code=400, detail="This email id already exists")

    # Create new employee
    emp = models.Employee(**data.dict())
    db.add(emp)
    db.commit()
    db.refresh(emp)  # fetch auto-generated ID
    return emp


@router.get("/")
def list_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@router.delete("/{id}")
def delete_employee(id: int, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).get(id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}

@router.put("/{id}")
def update_employee(
    id: int,
    data: schemas.EmployeeUpdate,
    db: Session = Depends(get_db)
):
    emp = db.query(models.Employee).get(id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    emp.full_name = data.full_name
    emp.email = data.email
    emp.department = data.department

    db.commit()
    db.refresh(emp)
    return emp
