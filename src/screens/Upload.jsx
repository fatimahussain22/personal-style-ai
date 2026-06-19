import { useState, useRef } from "react";
import { Wrap } from "../components/Shared";

const CARDS = [
  {
    kr: "왜?",
    q: "Why this app?",
    a: "Korean color analysis is expensive. So Fatima created an AI experience that brings your personalized palette to you.",
  },
  {
    kr: "방법",
    q: "How does it work?",
    a: "Upload photo + pick vein color. AI reads both like a 진단 session.",
  },
  {
    kr: "결과",
    q: "What do I get?",
    a: "Your palette, jewelry metal & full style advice one diagnosis.",
  },
];

const MOTIFS = [
  <svg viewBox="0 0 14 14" fill="none" width="13" height="13" key="m1">
    <circle cx="7" cy="7" r="2.5" fill="#D4A574" />
    <ellipse cx="7" cy="2" rx="1.5" ry="2" fill="#D4A574" opacity="0.5" />
    <ellipse cx="7" cy="12" rx="1.5" ry="2" fill="#D4A574" opacity="0.5" />
    <ellipse cx="2.2" cy="4" rx="1.5" ry="2" transform="rotate(-60 2.2 4)" fill="#D4A574" opacity="0.5" />
    <ellipse cx="11.8" cy="4" rx="1.5" ry="2" transform="rotate(60 11.8 4)" fill="#D4A574" opacity="0.5" />
    <ellipse cx="2.2" cy="10" rx="1.5" ry="2" transform="rotate(60 2.2 10)" fill="#D4A574" opacity="0.5" />
    <ellipse cx="11.8" cy="10" rx="1.5" ry="2" transform="rotate(-60 11.8 10)" fill="#D4A574" opacity="0.5" />
  </svg>,
  <svg viewBox="0 0 14 14" fill="none" width="13" height="13" key="m2">
    <circle cx="7" cy="7" r="5.5" stroke="#D4A574" strokeWidth="1" fill="none" />
    <circle cx="7" cy="7" r="2" fill="#D4A574" />
    <line x1="7" y1="1" x2="7" y2="3.2" stroke="#D4A574" strokeWidth="1" />
    <line x1="7" y1="10.8" x2="7" y2="13" stroke="#D4A574" strokeWidth="1" />
    <line x1="1" y1="7" x2="3.2" y2="7" stroke="#D4A574" strokeWidth="1" />
    <line x1="10.8" y1="7" x2="13" y2="7" stroke="#D4A574" strokeWidth="1" />
  </svg>,
  <svg viewBox="0 0 14 14" fill="none" width="13" height="13" key="m3">
    <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="#D4A574" strokeWidth="1" fill="none" />
    <line x1="4.5" y1="5" x2="9.5" y2="5" stroke="#D4A574" strokeWidth="1" />
    <line x1="4.5" y1="7.5" x2="9.5" y2="7.5" stroke="#D4A574" strokeWidth="1" />
    <line x1="4.5" y1="10" x2="7.5" y2="10" stroke="#D4A574" strokeWidth="1" />
  </svg>,
];

function BlossomDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "18px 0 20px" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border-soft)" }} />
      <svg width="52" height="18" viewBox="0 0 58 20" fill="none">
        <circle cx="29" cy="10" r="3" fill="#D4A574" opacity="0.9" />
        <ellipse cx="29" cy="4" rx="2.2" ry="3.5" fill="#E8B8C8" opacity="0.7" />
        <ellipse cx="29" cy="16" rx="2.2" ry="3.5" fill="#E8B8C8" opacity="0.7" />
        <ellipse cx="23" cy="7" rx="2.2" ry="3.5" transform="rotate(-60 23 7)" fill="#E8B8C8" opacity="0.7" />
        <ellipse cx="35" cy="7" rx="2.2" ry="3.5" transform="rotate(60 35 7)" fill="#E8B8C8" opacity="0.7" />
        <ellipse cx="23" cy="13" rx="2.2" ry="3.5" transform="rotate(60 23 13)" fill="#E8B8C8" opacity="0.7" />
        <ellipse cx="35" cy="13" rx="2.2" ry="3.5" transform="rotate(-60 35 13)" fill="#E8B8C8" opacity="0.7" />
        <circle cx="10" cy="10" r="2" fill="#D4A574" opacity="0.45" />
        <ellipse cx="10" cy="5.5" rx="1.6" ry="2.6" fill="#E8B8C8" opacity="0.35" />
        <ellipse cx="10" cy="14.5" rx="1.6" ry="2.6" fill="#E8B8C8" opacity="0.35" />
        <ellipse cx="5" cy="7.5" rx="1.6" ry="2.6" transform="rotate(-60 5 7.5)" fill="#E8B8C8" opacity="0.35" />
        <ellipse cx="15" cy="7.5" rx="1.6" ry="2.6" transform="rotate(60 15 7.5)" fill="#E8B8C8" opacity="0.35" />
        <circle cx="48" cy="10" r="2" fill="#D4A574" opacity="0.45" />
        <ellipse cx="48" cy="5.5" rx="1.6" ry="2.6" fill="#E8B8C8" opacity="0.35" />
        <ellipse cx="48" cy="14.5" rx="1.6" ry="2.6" fill="#E8B8C8" opacity="0.35" />
        <ellipse cx="43" cy="7.5" rx="1.6" ry="2.6" transform="rotate(-60 43 7.5)" fill="#E8B8C8" opacity="0.35" />
        <ellipse cx="53" cy="7.5" rx="1.6" ry="2.6" transform="rotate(60 53 7.5)" fill="#E8B8C8" opacity="0.35" />
      </svg>
      <div style={{ flex: 1, height: 1, background: "var(--border-soft)" }} />
    </div>
  );
}

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);
  const heights = [148, 164, 148];

  return (
    <div
      className={`psa-float-${index + 1}`}
      onClick={() => setFlipped(!flipped)}
      style={{
        perspective: "800px",
        height: heights[index],
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "50% 50% 6px 6px / 24% 24% 6px 6px",
            background: "linear-gradient(160deg, #FDF8F2 55%, #F5EAE2 100%)",
            border: "1.5px solid #D4A574",
            boxSizing: "border-box",
            padding: "14px 8px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "radial-gradient(#F5EAE2, #EDD9CC)",
              border: "1px solid #D4A574",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {MOTIFS[index]}
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#C4766B", fontFamily: "var(--font-display)" }}>
            {card.kr}
          </span>
          <span style={{ fontSize: "10.5px", color: "#5A4F47", textAlign: "center", lineHeight: 1.4 }}>
            {card.q}
          </span>
          <span style={{ fontSize: 8, color: "#B89E8F", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            눌러서 확인
          </span>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "50% 50% 6px 6px / 24% 24% 6px 6px",
            background: "linear-gradient(150deg, #8B6F63, #6B5651)",
            border: "1.5px solid #A88977",
            boxSizing: "border-box",
            padding: "16px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "10.5px", color: "#FDF8F2", lineHeight: 1.6, textAlign: "center" }}>
            {card.a}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Upload({ photoUrl, fileRef, handlePhotoUpload, goTo }) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const localRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePhotoUpload(e);
      setHasPhoto(true);
    }
  };

  return (
    <Wrap>
      <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0, background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)", borderRadius: 18, border: "1px solid #E5D9CE", boxShadow: "0 12px 56px rgba(100,60,30,0.18), inset 0 1px 0 rgba(255,255,255,0.6)", overflow: "hidden" }}>

        {/* LEFT PANEL */}
        <div style={{ padding: "38px 32px 36px", background: "linear-gradient(160deg, #FDFBF7 0%, #FAF6F0 100%)", display: "flex", flexDirection: "column", position: "relative", borderRight: "1px solid #E5D9CE" }}>

          <div style={{ position: "absolute", bottom: 16, right: 12, fontSize: 110, fontWeight: 600, color: "rgba(196,118,107,0.08)", fontFamily: "var(--font-display)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
            色
          </div>

          <div style={{ marginBottom: 16 }}>
            <span style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B8B7E" }}>
              Personal Color Diagnosis
            </span>
            <span style={{ display: "block", fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 300, color: "#B89E8F", letterSpacing: "0.08em", marginTop: 3 }}>
              퍼스널 컬러 진단 · AI 분석
            </span>
          </div>

          <div style={{ marginBottom: 0 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 600, lineHeight: 1.1, margin: 0, color: "#2A2520" }}>
              <em style={{ fontStyle: "normal", color: "#C4766B" }}>Find</em> Your
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 600, lineHeight: 1.1, margin: 0, color: "#2A2520" }}>
              True Colors <span style={{ fontSize: 15, color: "#E8B8C8" }}>✦</span>
            </p>
            <p style={{ fontSize: 12, color: "#B89E8F", marginTop: 8, fontFamily: "var(--font-body)", fontWeight: 300, letterSpacing: "0.06em" }}>
              당신만의 색을 찾아드립니다
            </p>
          </div>

          <BlossomDivider />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, alignItems: "end" }}>
            {CARDS.map((card, i) => (
              <FlipCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ padding: "38px 30px 36px", background: "linear-gradient(160deg, #FAF6EF 0%, #F2EAE0 100%)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>

          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B8B7E", marginBottom: -8 }}>
            사진 업로드 · Upload your photo
          </div>

          <input
            type="file"
            accept="image/*"
            ref={localRef}
            onChange={handleUpload}
            style={{ display: "none" }}
          />

          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            {/* Photo frame */}
            <div
              onClick={() => localRef.current.click()}
              style={{
                position: "relative",
                width: 96,
                height: 116,
                flexShrink: 0,
                borderRadius: 8,
                overflow: "hidden",
                border: "1.5px solid #D4A574",
                background: "#F0E6DD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(100,60,30,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B8845D";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(100,60,30,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#D4A574";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(100,60,30,0.1)";
              }}
            >
              {!photoUrl ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B89E8F" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span style={{ fontSize: 10, color: "#9B8B7E", textAlign: "center" }}>
                    사진<br />
                    Photo
                  </span>
                </div>
              ) : (
                <img src={photoUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
              )}
              {photoUrl && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(42,37,32,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    borderRadius: 6,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", textAlign: "center", lineHeight: 1.4 }}>
                    변경<br />
                    Change
                  </span>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#2A2520", marginBottom: 2 }}>
                Drop your photo here
              </div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 300, color: "#B89E8F", marginBottom: 12 }}>
                얼굴 사진을 업로드하세요
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {["Face visible · 얼굴", "Natural light · 자연광", "No filters · 필터 없이"].map((tip) => (
                  <li key={tip} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#5A4F47" }}>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "#EDD9CC",
                        border: "1px solid #D4C4B0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#9B8B7E" strokeWidth="1.8" strokeLinecap="round">
                        <polyline points="1.5,5 4,7.5 8.5,2" />
                      </svg>
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <button
              onClick={() => localRef.current.click()}
              style={{
                width: "100%",
                padding: 11,
                background: "transparent",
                color: "#2A2520",
                border: "1px solid #D5CAC0",
                borderRadius: 9,
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#9B8B7E";
                e.currentTarget.style.background = "#F0E6DD";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#D5CAC0";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {photoUrl ? "Change Photo · 변경" : "Upload Photo · 업로드"}
            </button>

            {photoUrl && (
              <button
                onClick={() => goTo("vein")}
                style={{
                  width: "100%",
                  padding: 13,
                  background: "linear-gradient(135deg, #5C7B6B, #4A6559)",
                  color: "#F8F3ED",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  boxShadow: "0 4px 14px rgba(92,123,107,0.24)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(92,123,107,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(92,123,107,0.24)";
                }}
              >
                Analyze My Colors ✦ <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 11, opacity: 0.72 }}>분석 시작</span>
              </button>
            )}
          </div>

          <div style={{ textAlign: "center", fontSize: 10, color: "#B89E8F", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontFamily: "var(--font-body)", fontWeight: 300 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B89E8F" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            사진은 안전하게 보호됩니다 · Your photo is private
          </div>

        </div>
      </div>
      
      
    </Wrap>
    
  );
}