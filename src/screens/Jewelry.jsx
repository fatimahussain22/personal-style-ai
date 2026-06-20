import { Wrap, BackBtn, Btn } from "../components/Shared";
import { JEWELRY_METAL } from "../data/jewelry";

export default function Jewelry({ undertone, goTo, goBack }) {
  const j = JEWELRY_METAL[undertone];

  // Determine metal color for accent
  const getMetalColor = (metal) => {
    if (metal.toLowerCase().includes("gold")) return "#D4A574";
    if (metal.toLowerCase().includes("silver")) return "#A8A8A8";
    if (metal.toLowerCase().includes("rose")) return "#C4766B";
    return "var(--accent-secondary)";
  };

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
        Jewelry Recommendation
      </div>

      {/* Main Card */}
      <div style={{
        background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        boxShadow: "0 12px 56px rgba(100,60,30,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
        padding: "40px 36px",
        maxWidth: "560px",
        margin: "0 auto 32px"
      }}>
        {/* Jewelry Icon */}
        <div style={{
          fontSize: "48px",
          marginBottom: "16px",
          textAlign: "center"
        }}>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "36px",
          fontWeight: "600",
          color: "var(--ink)",
          marginBottom: "8px",
          lineHeight: "1.2",
          textAlign: "center"
        }}>
          <span style={{ color: getMetalColor(j.metal) }}>
            {j.metal}
          </span>
          <br />
          Suits You Best
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--ink-light)",
          letterSpacing: "0.06em",
          marginBottom: "24px",
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "500"
        }}>
          The Perfect Metal for Your Skin Tone
        </p>

        {/* Metal Badge */}
        <div style={{
          
          alignItems: "center",
          gap: "8px",
          padding: "12px 20px",
          background: `${getMetalColor(j.metal)}20`,
          border: `1.5px solid ${getMetalColor(j.metal)}`,
          borderRadius: "12px",
          
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "center"
        }}>
          <span style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: getMetalColor(j.metal)
          }} />
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: "600",
            color: getMetalColor(j.metal)
          }}>
            {j.metal}
          </span>
        </div>

        {/* Reason/Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--ink)",
          lineHeight: "1.6",
          textAlign: "center",
          marginBottom: "32px",
          opacity: "0.9"
        }}>
          {j.reason}
        </p>

        {/* Jewelry Images */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
          justifyContent: "center"
        }}>
          {j.images && j.images.map((src, i) => (
            <div
              key={i}
              style={{
                flex: "1",
                maxWidth: "140px",
                aspectRatio: "1",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1.5px solid var(--border)",
                boxShadow: "0 4px 12px rgba(100,60,30,0.12)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(100,60,30,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(100,60,30,0.12)";
              }}
            >
              <img
                src={src}
                alt={`${j.metal} jewelry`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
          ))}
        </div>

        {/* Info Text */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--ink-light)",
          lineHeight: "1.5",
          textAlign: "center",
          marginBottom: "0",
          fontStyle: "italic"
        }}>
          This metal enhances your natural glow and complements your skin tone beautifully.
        </p>
      </div>

      {/* CTA Button */}
      <Btn
        label="Find jewelry for my face shape ✦"
        onClick={() => goTo("faceShape")}
        color="var(--celadon)"
      />
    </Wrap>
  );
}