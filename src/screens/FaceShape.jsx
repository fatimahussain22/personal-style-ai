import { useState } from "react";
import { Wrap, BackBtn, Btn } from "../components/Shared";

export default function FaceShape({ handleFaceShape, goBack }) {
  const [selected, setSelected] = useState(null);
  const shapes = ["Oval", "Round", "Square", "Heart", "Oblong"];

  const handleSelect = (shape) => {
    setSelected(shape);
    handleFaceShape(shape);
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
        Face Shape Analysis
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
          What's Your
          <br />
          <span style={{ color: "var(--accent-primary)" }}>Face Shape?</span>
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
          Find Flattering Jewelry Styles
        </p>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--ink)",
          lineHeight: "1.6",
          textAlign: "center",
          marginBottom: "32px",
          opacity: "0.9"
        }}>
          Certain jewelry shapes complement different face proportions. Select your face shape to find your perfect match.
        </p>

        {/* Face Shape Buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px"
        }}>
          {shapes.map((shape) => (
            <button
              key={shape}
              onClick={() => handleSelect(shape)}
              style={{
                padding: "16px 20px",
                borderRadius: "12px",
                border: selected === shape 
                  ? "2px solid var(--celadon)" 
                  : "1.5px solid var(--border)",
                background: selected === shape
                  ? "rgba(92, 123, 107, 0.08)"
                  : "transparent",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: "600",
                color: selected === shape 
                  ? "var(--celadon)" 
                  : "var(--ink)",
                textAlign: "left",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
              onMouseEnter={(e) => {
                if (selected !== shape) {
                  e.currentTarget.style.borderColor = "var(--ink-light)";
                  e.currentTarget.style.background = "rgba(185, 158, 143, 0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== shape) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {/* Shape indicator circle */}
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: selected === shape
                  ? "var(--celadon)"
                  : "var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "12px",
                color: selected === shape ? "#fff" : "var(--ink-light)"
              }}>
                {selected === shape ? "✓" : "•"}
              </div>
              {shape}
            </button>
          ))}
        </div>

        {/* Info Text */}
        {selected && (
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--celadon)",
            textAlign: "center",
            marginBottom: "0",
            fontStyle: "italic",
            animation: "fadeIn 0.3s ease-in"
          }}>
            ✓ {selected} face shape selected
          </p>
        )}
      </div>

      {/* Next Button - Only show when selected */}
      {selected && (
        <Btn
          label="Find flattering jewelry styles ✦"
          onClick={() => {}}
          color="var(--celadon)"
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Wrap>
  );
}