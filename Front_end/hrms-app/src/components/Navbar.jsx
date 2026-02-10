export default function Navbar({ setPage }) {
  return (
    <nav style={styles.nav}>
      <h2>HRMS Lite</h2>
      <div>
        <button onClick={() => setPage("employees")}>Employees</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    background: "#1f2937",
    color: "white",
  },
};
