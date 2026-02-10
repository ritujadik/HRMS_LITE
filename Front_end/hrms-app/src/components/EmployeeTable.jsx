import { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployeeTable({ reload, onEdit, onDeleteSuccess }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employees").then((res) => setEmployees(res.data));
  }, [reload]);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    await API.delete(`/employees/${id}`);
    onDeleteSuccess();
  };

  if (!employees.length) return <p>No employees found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>EMP ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button className="danger" onClick={() => deleteEmployee(emp.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
