import { Wrap, BackBtn } from "../components/Shared";

export default function Vein({ loading, handleVeinSelect, goBack }) {
  return (
    <Wrap>
      <div style={{
        background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
        borderRadius: 18,
        border: "1px solid #E5D9CE",
        boxShadow: "0 12px 56px rgba(100,60,30,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
        padding: "40px 36px",
        maxWidth: 500,
        margin: "0 auto",
      }}>
        <BackBtn onClick={goBack} />

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
          What color are your wrist veins?
        </h3>
        <p style={{ color: "var(--ink-light)", fontSize: 13, marginBottom: 20 }}>
            Check in natural daylight near a window for best results
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Blue", "Purple", "Green", "Olive/Yellow-Green", "Blue-Green/Teal", "Purple/Green"].map((v) => (
            <button
              key={v}
              onClick={() => handleVeinSelect(v)}
              disabled={loading}
              style={{
                padding: "12px 16px",
                borderRadius: 9,
                border: `1.5px solid ${loading ? "#DDD0C6" : "#D4C4B0"}`,
                cursor: loading ? "default" : "pointer",
                background: "#FDFBF7",
                fontSize: 15,
                textAlign: "left",
                color: "var(--ink)",
                fontWeight: 500,
                transition: "all 0.15s",
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.background = "#F5EFE6";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = "#D4C4B0";
                  e.currentTarget.style.background = "#FDFBF7";
                }
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {loading && (
          <p style={{ textAlign: "center", color: "var(--ink-light)", marginTop: 20, fontSize: 14 }}>
            Analyzing... 
          </p>
        )}
      </div>
    </Wrap>
  );
}