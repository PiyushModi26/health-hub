const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;

export async function getMedicationsFromImage(imageBase64) {
  if (!API_KEY) {
    console.error("Gemini API key is not set in .env.local");
    return Promise.resolve([
      { name: "Lisinopril (Simulated)", dosage: "10mg", notes: "Once daily" },
    ]);
  }

  const payload = {
    contents: [{
      parts: [
        {
          text: `Analyze this prescription image. Extract medications into a clean JSON array of objects with keys: "name", "dosage", "notes". Example: [{"name": "Atorvastatin", "dosage": "20mg", "notes": "Take one at bedtime"}]`
        },
        {
          inline_data: { mime_type: "image/jpeg", data: imageBase64 }
        }
      ]
    }]
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "API error");
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}