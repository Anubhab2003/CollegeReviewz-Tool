const ProgressBar = ({ current, total }) => {
    const percent = Math.round((current / total) * 100);
  
    return (
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 5 }}>
          Progress: {percent}%
        </div>
        <div style={{ height: 10, background: "#ddd" }}>
          <div
            style={{
              height: "100%",
              width: `${percent}%`,
              background: "#4caf50"
            }}
          />
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  