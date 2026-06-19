import { useState, useRef } from "react";
import Upload from "./screens/Upload";
import Vein from "./screens/Vein";
import Result from "./screens/Result";
import WearColors from "./screens/WearColors";
import AvoidColors from "./screens/AvoidColors";
import Jewelry from "./screens/Jewelry";
import FaceShape from "./screens/FaceShape";
import FaceJewelry from "./screens/FaceJewelry";
import Budget from "./screens/Budget";

const MOCK_MODE = true;
const API_KEY = process.env.REACT_APP_GEMINI_KEY;

const MOCK_RESPONSE = {
  undertone: "warm",
  reason: "Your skin has golden and peachy hues, and your olive/yellow-green veins confirm a warm undertone.",
};

export default function App() {
  const [screen, setScreen] = useState("upload");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [undertone, setUndertone] = useState(null);
  const [reason, setReason] = useState(null);
  const [faceShape, setFaceShape] = useState(null);
  const [loading, setLoading] = useState(false);
  const [veinError, setVeinError] = useState(null);
  const [history, setHistory] = useState([]);
  const fileRef = useRef();

  const goTo = (nextScreen) => {
    setHistory((prev) => [...prev, screen]);
    setScreen(nextScreen);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setScreen(prev);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    const reader = new FileReader();
    reader.onload = () => setPhotoBase64(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  };

  const handleVeinSelect = async (veinColor) => {
    setLoading(true);
    try {
      let u, r;
      if (MOCK_MODE) {
        await new Promise((res) => setTimeout(res, 1000));
        u = MOCK_RESPONSE.undertone;
        r = MOCK_RESPONSE.reason;
      } else {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { inline_data: { mime_type: "image/jpeg", data: photoBase64 } },
                  {
                    text: `Analyze this person's skin tone and undertone. Their wrist veins appear ${veinColor}.
Vein color guide:
- Blue or Purple = cool undertone
- Green or Olive/Yellow-Green = warm undertone
- Blue-Green/Teal = neutral undertone
- Purple/Green mix = neutral to olive undertone
Based on BOTH the photo and vein color, determine:
1. Their undertone: warm, cool, neutral, or olive
2. A brief explanation of why (2 sentences max)
Reply EXACTLY in this format:
UNDERTONE: warm/cool/neutral/olive
REASON: explanation`,
                  },
                ],
              }],
            }),
          }
        );
        const data = await response.json();
        if (data?.error) throw new Error(data.error.message);
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const um = text.match(/UNDERTONE:\s*(warm|cool|neutral|olive)/i);
        const rm = text.match(/REASON:\s*(.+)/i);
        u = um ? um[1] : "neutral";
        r = rm ? rm[1] : text;
      }
      setUndertone(u);
      setReason(r);
      goTo("result");
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
    setLoading(false);
  };

  const handleFaceShape = (shape) => {
    setFaceShape(shape);
    goTo("faceJewelry");
  };

  if (screen === "upload") return <Upload photoUrl={photoUrl} fileRef={fileRef} handlePhotoUpload={handlePhotoUpload} goTo={goTo} />;
  if (screen === "vein") return <Vein loading={loading} handleVeinSelect={handleVeinSelect} goBack={goBack} />;
  if (screen === "result") return <Result undertone={undertone} reason={reason} goTo={goTo} goBack={goBack} />;
  if (screen === "wearColors") return <WearColors photoUrl={photoUrl} undertone={undertone} goTo={goTo} goBack={goBack} />;
  if (screen === "avoidColors") return <AvoidColors photoUrl={photoUrl} undertone={undertone} goTo={goTo} goBack={goBack} />;
  if (screen === "jewelry") return <Jewelry undertone={undertone} goTo={goTo} goBack={goBack} />;
  if (screen === "faceShape") return <FaceShape handleFaceShape={handleFaceShape} goBack={goBack} />;
  if (screen === "faceJewelry") return <FaceJewelry faceShape={faceShape} goTo={goTo} goBack={goBack} />;
  if (screen === "budget") return (
  <Budget
    goBack={goBack}
    undertone={undertone}
    faceShape={faceShape}
  />
); ;

  return null;
}