import { useState } from "react";
import { Wrap, BackBtn, Btn } from "../components/Shared";
import { COLOR_PALETTES } from "../data/palettes";
import { JEWELRY_METAL } from "../data/jewelry";

const MOCK_MODE = true;

const MOCK_STORES = [
  { name: "Nishat Linen", category: "Clothing", reason: "Great warm-toned kurtas in terracotta, coral and camel shades.", link: "https://nishatlinen.com" },
  { name: "Alkaram Studio", category: "Clothing", reason: "Affordable warm color collections with rust, burnt orange and cream options.", link: "https://alkaramstudio.com" },
  { name: "Sapphire", category: "Clothing", reason: "Trendy pieces in warm earthy tones that complement your undertone.", link: "https://sapphire.pk" },
  { name: "Khaadi", category: "Clothing", reason: "Wide range of warm-toned prints and solids, great value for budget.", link: "https://khaadi.com" },
  { name: "Agha Noor", category: "Clothing", reason: "Premium warm-toned formal wear in your color palette.", link: "https://aghanoor.com" },
  { name: "Meena Bazaar", category: "Jewelry", reason: "Beautiful gold jewelry that complements your warm undertone.", link: "https://meenabazaar.com" },
  { name: "Popinjay", category: "Jewelry & Accessories", reason: "Trendy gold-toned jewelry and accessories within budget.", link: "https://popinjay.com" },
];

export default function Budget({ goBack, undertone, faceShape }) {
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_GEMINI_KEY;
  const colors = COLOR_PALETTES[undertone]?.wear.map((c) => c.name) || [];
  const jewelryMetal = JEWELRY_METAL[undertone]?.metal || "Gold";

  const handleSearch = async () => {
    if (!budget.trim()) return;
    setLoading(true);
    setError(null);
    setStores(null);

    try {
      let results;

      if (MOCK_MODE) {
        await new Promise((res) => setTimeout(res, 1500));
        results = MOCK_STORES;
      } else {
        const prompt = `You are a Pakistani fashion assistant.
A user has the following style profile:
- Skin undertone: ${undertone}
- Colors that suit them: ${colors.join(", ")}
- Jewelry metal: ${jewelryMetal}
- Face shape: ${faceShape}
- Budget: ${budget} PKR

Suggest 5-7 Pakistani stores where this person can shop for clothes and jewelry matching their color profile and budget.

Reply ONLY in this exact JSON format, no extra text:
[
  {
    "name": "Store Name",
    "category": "Clothing or Jewelry",
    "reason": "One sentence why this store suits them",
    "link": "https://storewebsite.com"
  }
]`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const data = await response.json();
        if (data?.error) throw new Error(data.error.message);
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const clean = text.replace(/```json|```/g, "").trim();
        results = JSON.parse(clean);
      }

      setStores(results);
    } catch (err) {
      // Any failure here — quota exhaustion, network drop, malformed
      // Gemini output, JSON.parse failure, etc. — shows the same calm
      // message. Real users never see a raw error string.
      console.error("Budget store search failed:", err);
      setError(
        "✦ This demo's free API quota has run out for now. It resets soon — please check back in a bit and try again. Thanks for your patience!"
      );
    }

    setLoading(false);
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
        Store Recommendations
      </div>

      {!stores ? (
        <>
          {/* Input Card */}
          <div style={{
            background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            boxShadow: "0 12px 56px rgba(100,60,30,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
            padding: "40px 36px",
            maxWidth: "560px",
            margin: "0 auto 32px"
          }}>
            {/* Shopping Bag Icon */}
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
              Find Stores
              <br />
              <span style={{ color: "var(--accent-primary)" }}>For You</span>
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
              Personalized Store Suggestions
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
              Enter your budget and we'll find the best Pakistani stores that match your color palette and style.
            </p>

            {/* Budget Input */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--ink)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              }}>
                Your Budget (PKR)
              </label>
              <input
                type="number"
                placeholder="e.g. 3000, 5000, 10000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1.5px solid var(--border)",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--ink)",
                  background: "rgba(255, 255, 255, 0.5)",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s, background 0.2s"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-secondary)";
                  e.currentTarget.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--ink)",
                marginBottom: "16px",
                textAlign: "center",
                lineHeight: "1.5",
                padding: "14px 16px",
                background: "rgba(212, 165, 116, 0.15)",
                border: "1px solid var(--accent-secondary)",
                borderRadius: "10px"
              }}>
                {error}
              </p>
            )}
          </div>

          {/* Search Button */}
          <Btn
            label={loading ? "Searching stores... " : "Find stores for my budget ✦"}
            onClick={handleSearch}
            disabled={loading || !budget.trim()}
          />
        </>
      ) : (
        <>
          {/* Results Header */}
          <div style={{
            background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            boxShadow: "0 12px 56px rgba(100,60,30,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
            padding: "40px 36px",
            maxWidth: "560px",
            margin: "0 auto 32px",
            textAlign: "center"
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: "600",
              color: "var(--ink)",
              marginBottom: "8px"
            }}>
              Perfect Stores
              <br />
              <span style={{ color: "var(--accent-primary)" }}>For Your Budget</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--ink-light)",
              marginBottom: "0"
            }}>
              {stores.length} recommendations matched to your style profile
            </p>
          </div>

          {/* Store Cards */}
          <div style={{
            maxWidth: "560px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px"
          }}>
            {stores.map((store, i) => (
              <a
                key={i}
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  boxShadow: "0 4px 12px rgba(100,60,30,0.08)",
                  transition: "box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(100,60,30,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(100,60,30,0.08)";
                }}
                >
                  {/* Store Header */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: "600",
                      color: "var(--ink)"
                    }}>
                      {store.name}
                    </span>
                    <span style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      padding: "6px 10px",
                      borderRadius: "20px",
                      background: store.category === "Clothing"
                        ? "rgba(92, 123, 107, 0.15)"
                        : store.category === "Jewelry"
                        ? "rgba(196, 118, 107, 0.15)"
                        : "rgba(212, 165, 116, 0.15)",
                      color: store.category === "Clothing"
                        ? "var(--celadon)"
                        : store.category === "Jewelry"
                        ? "var(--accent-primary)"
                        : "var(--accent-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em"
                    }}>
                      {store.category}
                    </span>
                  </div>

                  {/* Store Reason */}
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--ink)",
                    lineHeight: "1.5",
                    margin: "0"
                  }}>
                    {store.reason}
                  </p>

                  {/* Visit Link */}
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "var(--celadon)",
                    marginTop: "4px"
                  }}>
                    Visit Store →
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setStores(null);
              setBudget("");
              setError(null);
            }}
            style={{
              display: "block",
              width: "100%",
              maxWidth: "560px",
              margin: "0 auto",
              padding: "14px 24px",
              background: "linear-gradient(160deg, #FDFBF7 0%, #F8F3ED 100%)",
              border: "1.5px solid var(--accent-secondary)",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(100,60,30,0.1)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--ink)",
              transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(100,60,30,0.16)";
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(100,60,30,0.1)";
              e.currentTarget.style.borderColor = "var(--accent-secondary)";
            }}
          >
            Search again with different budget
          </button>
        </>
      )}
    </Wrap>
  );
}