import { useLocation, useNavigate } from "react-router-dom";

const ReportPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // SAFETY: backend returns ONLY reportPath
  if (!state || !state.reportPath) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No report available</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Assessment Completed ✅</h1>

      <p>Your career assessment report has been generated successfully.</p>

      <a
        href={`http://localhost:5000/${state.reportPath}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "12px 24px",
          background: "#2563eb",
          color: "#fff",
          textDecoration: "none",
          borderRadius: 6
        }}
      >
        Download Career Report (PDF)
      </a>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Take Assessment Again
      </button>
    </div>
  );
};

export default ReportPage;
