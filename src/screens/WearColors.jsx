import { Wrap, BackBtn, Btn } from "../components/Shared";
import { COLOR_PALETTES } from "../data/palettes";

export default function WearColors({ photoUrl, undertone, goTo, goBack }) {
  const colors = COLOR_PALETTES[undertone]?.wear || [];

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
        Your Color Palette
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
          Colors That
          <br />
          <span style={{ color: "var(--accent-primary)" }}>Suit You</span>
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
          Wear these tones to enhance your natural beauty
        </p>

        {/* Photo Preview */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px"
        }}>
          <img
            src={photoUrl}
            alt="user portrait"
            style={{
              width: "100px",
              height: "120px",
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: "12px",
              border: "1.5px solid var(--accent-secondary)",
              boxShadow: "0 4px 12px rgba(100,60,30,0.12)"
            }}
          />
        </div>

        {/* Color Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "32px"
        }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Color Swatch */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: color.hex,
                  borderRadius: "12px",
                  border: "1.5px solid var(--border)",
                  boxShadow: "0 4px 12px rgba(100,60,30,0.12)",
                  transition: "box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(100,60,30,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(100,60,30,0.12)";
                }}
              />
              {/* Color Name */}
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--ink)",
                textAlign: "center",
                lineHeight: "1.3",
                minHeight: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--ink-light)",
          lineHeight: "1.6",
          textAlign: "center",
          marginBottom: "0",
          fontStyle: "italic"
        }}>
          These shades complement your {undertone} undertone beautifully.
        </p>
      </div>

      {/* CTA Button */}
      <Btn
        label="See colors to avoid ✦"
        onClick={() => goTo("avoidColors")}
        color="var(--celadon)"
      />
    </Wrap>
  );
}