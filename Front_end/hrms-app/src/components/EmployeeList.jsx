import { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployeeList({ reload }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/employees")
      .then((res) => setEmployees(res.data))
      .finally(() => setLoading(false));
  }, [reload]);

  if (loading) return <p>Loading employees...</p>;
  if (!employees.length) return <p>No employees found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
