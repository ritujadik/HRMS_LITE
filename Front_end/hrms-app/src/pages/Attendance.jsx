import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h3>Attendance Management</h3>
      <AttendanceForm />
      <AttendanceTable />
    </div>
  );
}
