import { Wrap, BackBtn, Btn } from "../components/Shared";
import { FACE_SHAPE_JEWELRY } from "../data/jewelry";

export default function FaceJewelry({ faceShape, goTo, goBack }) {
  const fj = FACE_SHAPE_JEWELRY[faceShape];

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
        Jewelry Style Guide
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
        {/* Diamond Icon */}
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
          Styles for Your
          <br />
          <span style={{ color: "var(--accent-primary)" }}>
            {faceShape} Face
          </span>
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
          Flattering Jewelry Shapes & Styles
        </p>

        {/* Face Shape Badge */}
        <div style={{
          
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 18px",
          background: "rgba(196, 118, 107, 0.12)",
          border: "1.5px solid var(--accent-primary)",
          borderRadius: "12px",
          margin: "0 auto 24px",
          display: "flex"
        }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--accent-primary)"
          }}>
            {faceShape}
          </span>
        </div>

        {/* Jewelry Advice */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--ink)",
          lineHeight: "1.6",
          textAlign: "center",
          marginBottom: "32px",
          opacity: "0.9"
        }}>
          {fj.advice}
        </p>

        {/* Jewelry Style Images */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
          justifyContent: "center"
        }}>
          {fj.images && fj.images.map((src, i) => (
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
                alt={`${faceShape} jewelry style`}
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
          These styles complement {faceShape.toLowerCase()} face proportions beautifully.
        </p>
      </div>

      {/* CTA Button */}
      <Btn
        label="Set my budget ✦"
        onClick={() => goTo("budget")}
        color="var(--celadon)"
      />
    </Wrap>
  );
}