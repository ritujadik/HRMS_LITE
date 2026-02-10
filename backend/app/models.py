from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True,index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    department = Column(String)

    attendance = relationship("Attendance", back_populates="employee")

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    date = Column(Date)
    status = Column(String)

    employee = relationship("Employee", back_populates="attendance")
