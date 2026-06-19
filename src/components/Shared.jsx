import blossomBg from "../assets/9048e87f278fdf7d3438e10d9dc152b4.jpg";

export function Wrap({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      backgroundImage: `linear-gradient(rgba(245,235,224,0.5), rgba(245,235,224,0.5)), url(${blossomBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "var(--font-body)",
      color: "var(--ink)",
      padding: "24px 20px 56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 860, position: "relative", zIndex: 1 }}>
        {children}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "11px",
          color: "var(--ink)",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-body)",
          zIndex: 1,
          padding: "6px 12px",
          margin: "0 auto",
          width: "fit-content",
          background: "rgba(253, 251, 247, 0.75)",
          borderRadius: "8px",
        }}
      >
        © {new Date().getFullYear()} Fatima Hussain. All rights reserved.
      </div>
    </div>
  );
}

export function Btn({ label, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="psa-btn psa-btn-celadon"
      style={color ? { background: color } : {}}
    >
      {label}
    </button>
  );
}

export function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} className="psa-back-btn">
      ← Back
    </button>
  );
}