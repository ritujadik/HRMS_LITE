import { useState, useEffect } from "react";
import API from "../api/api";

export default function EmployeeForm({
  selectedEmployee,
  clearSelection,
  onSuccess,
  showTable,
  setShowTable,
}) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        full_name: selectedEmployee.full_name,
        email: selectedEmployee.email,
        department: selectedEmployee.department,
      });
    } else {
      setForm({ full_name: "", email: "", department: "" });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.full_name || !form.email || !form.department) {
      setError("All fields are required");
      return;
    }

    try {
      if (selectedEmployee) {
        // Update employee
        await API.put(`/employees/${selectedEmployee.id}`, form);
      } else {
        // Add new employee
        await API.post("/employees/", form);
      }

      // Success actions
      onSuccess(); // Refresh table
      clearSelection(); // Clear selection
      setForm({ full_name: "", email: "", department: "" }); // Reset form
      setError("");
      setShowTable(true); // Show table after add/update
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  // **Refresh / Clear Form**
  const handleRefresh = () => {
    setForm({ full_name: "", email: "", department: "" });
    clearSelection();
    setError("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h4 className="form-title">Employee Details</h4>

      <label>EMP ID</label>
      <input value={selectedEmployee?.id || "Auto Generated"} disabled />

      <label>Full Name</label>
      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Enter full name"
      />

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email address"
      />

      <label>Department</label>
      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Enter department"
      />

      {error && <p className="error">{error}</p>}

      {/* Buttons Row: Add/Update + View Employees + Refresh */}
      <div className="buttons-row">
        <button type="submit">
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </button>

        <button type="button" onClick={() => setShowTable(true)}>
          View Employees
        </button>

        <button type="button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </form>
  );
}
