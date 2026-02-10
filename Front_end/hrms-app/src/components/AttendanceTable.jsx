import { useEffect, useState } from "react";
import API from "../api/api";
import "./Attendance.css";

export default function AttendanceTable() {
  const [employees, setEmployees] = useState([]);
  const [viewType, setViewType] = useState(""); // "" | "employee" | "all"
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [viewClicked, setViewClicked] = useState(false); // show cards only after click

  useEffect(() => {
    API.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const fetchAttendance = async () => {
    try {
      let res;
      if (viewType === "all") {
        res = await API.get("/attendance/all");
      } else if (selectedEmployee) {
        res = await API.get(`/attendance/employee/${selectedEmployee}`);
      } else {
        res = { data: [] }; // no selection
      }
      setAttendanceRecords(res.data);
      setViewClicked(true); // now render cards
    } catch (err) {
      console.error(err);
      alert("Error fetching attendance");
    }
  };

  const getEmployeeAttendance = (empId) =>
    attendanceRecords.filter((r) => r.employee_id === empId);

  // Determine which employees to show cards for
  const employeesToShow =
    viewType === "all"
      ? employees
      : selectedEmployee
        ? [employees.find((e) => e.id === parseInt(selectedEmployee))]
        : [];

  return (
    <div className="attendance-section">
      <h4>View Attendance</h4>

      {/* View type selector */}
      <div className="view-options">
        <label>
          <input
            type="radio"
            name="viewType"
            value="employee"
            checked={viewType === "employee"}
            onChange={() => {
              setViewType("employee");
              setSelectedEmployee("");
              setAttendanceRecords([]);
              setViewClicked(false);
            }}
          />
          Employee-wise
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="all"
            checked={viewType === "all"}
            onChange={() => {
              setViewType("all");
              setSelectedEmployee("");
              setAttendanceRecords([]);
              setViewClicked(false);
            }}
          />
          All Employees
        </label>
      </div>

      {/* Employee dropdown */}
      {viewType === "employee" && (
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>
      )}

      <button onClick={fetchAttendance}>View Attendance</button>

      {/* Attendance cards */}
      {viewClicked && (
        <div className="attendance-cards">
          {employeesToShow.map((emp) => {
            if (!emp) return null;
            const records = getEmployeeAttendance(emp.id);
            return (
              <div key={emp.id} className="attendance-card">
                <h5>{emp.full_name}</h5>
                <p>Email: {emp.email}</p>
                <p>Department: {emp.department}</p>

                {records.length > 0 ? (
                  <ul>
                    {records.map((r, idx) => (
                      <li key={idx}>
                        {r.date} - {r.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No attendance found</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
