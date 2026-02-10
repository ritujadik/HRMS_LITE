import { useEffect, useState } from "react";
import API from "../api/api";
import "./Attendance.css";

export default function AttendanceForm({ onMarkSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.employee_id || !data.date || !data.status) {
      setError("All fields are required");
      return;
    }

    try {
      await API.post("/attendance/", data);
      alert("Attendance marked successfully");
      setData({ employee_id: "", date: "", status: "Present" });
      setError("");
      if (onMarkSuccess) onMarkSuccess(); // Refresh view
    } catch (err) {
      console.error(err);
      alert("Error marking attendance");
    }
  };

  return (
    <div className="attendance-section">
      <h4>Mark Attendance</h4>
      {error && <p className="error">{error}</p>}
      <form className="attendance-form" onSubmit={handleSubmit}>
        <label>Employee</label>
        <select
          value={data.employee_id}
          onChange={(e) => setData({ ...data, employee_id: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />

        <label>Status</label>
        <select
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
}
