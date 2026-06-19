import { Wrap, BackBtn, Btn } from "../components/Shared";

export default function Result({ undertone, reason, goTo, goBack }) {
  return (
    <Wrap>
      <BackBtn onClick={goBack} />
      
      {/* Eyebrow label */}
      <div style={{
        fontSize: "9px",
        fontWeight: "600",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--ink-light)",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        Analysis Complete
      </div>

      {/* Main Card */}
      <div style={{
        background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        boxShadow: "0 12px 56px rgba(100,60,30,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
        padding: "40px 36px",
        maxWidth: "560px",
        margin: "0 auto 32px",
        textAlign: "center",
        position: "relative"
      }}>
        {/* Checkmark Icon */}
        <div style={{
          fontSize: "48px",
          marginBottom: "16px",
          animation: "pulse 2s ease-in-out"
        }}>
          ✓
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "36px",
          fontWeight: "600",
          color: "var(--ink)",
          marginBottom: "8px",
          lineHeight: "1.2"
        }}>
          Your True
          <br />
          <span style={{ color: "var(--accent-primary)" }}>
            {undertone.charAt(0).toUpperCase() + undertone.slice(1)} Undertone
          </span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--ink-light)",
          letterSpacing: "0.06em",
          marginBottom: "24px",
          textTransform: "uppercase",
          fontWeight: "500"
        }}>
          Perfectly Matched to Your Skin
        </p>

        {/* Reason/Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--ink)",
          lineHeight: "1.6",
          marginBottom: "32px",
          opacity: "0.9"
        }}>
          {reason}
        </p>

        {/* Undertone Badge */}
        <div style={{
          display: "inline-block",
          padding: "12px 24px",
          background: undertone === "warm" 
            ? "rgba(196, 118, 107, 0.12)" 
            : undertone === "cool"
            ? "rgba(92, 123, 107, 0.12)"
            : "rgba(212, 165, 116, 0.12)",
          border: `1px solid ${
            undertone === "warm" 
              ? "var(--accent-primary)" 
              : undertone === "cool"
              ? "var(--celadon)"
              : "var(--accent-secondary)"
          }`,
          borderRadius: "12px",
          marginBottom: "32px"
        }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: "600",
            color: undertone === "warm" 
              ? "var(--accent-primary)" 
              : undertone === "cool"
              ? "var(--celadon)"
              : "var(--accent-secondary)",
            textTransform: "capitalize"
          }}>
            {undertone} · {undertone === "warm" ? "따뜻한" : undertone === "cool" ? "차가운" : "중성"}
          </span>
        </div>
      </div>

      {/* CTA Button — no color override, uses default psa-btn-celadon gradient */}
      <Btn 
        label="See colors that suit you ✦" 
        onClick={() => goTo("wearColors")}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
      `}</style>
    </Wrap>
  );
}