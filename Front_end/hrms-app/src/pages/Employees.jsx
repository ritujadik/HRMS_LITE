import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [showTable, setShowTable] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reload, setReload] = useState(false);

  const refreshTable = () => setReload(!reload); // toggles to reload table

  // Always listen to "viewEmployees" event
  useEffect(() => {
    const listener = () => setShowTable(true);
    window.addEventListener("viewEmployees", listener);
    return () => window.removeEventListener("viewEmployees", listener);
  }, []);

  return (
    <div className="page">
      <h3 className="page-title">Employee Management</h3>

      {/* Employee Form */}
      <EmployeeForm
        selectedEmployee={selectedEmployee}
        clearSelection={() => setSelectedEmployee(null)}
        onSuccess={refreshTable} // refresh table after add/update
        showTable={showTable}
        setShowTable={setShowTable}
      />

      {/* Employee Table */}
      {showTable && (
        <EmployeeTable
          reload={reload}
          onEdit={setSelectedEmployee}
          onDeleteSuccess={refreshTable}
        />
      )}
    </div>
  );
}
