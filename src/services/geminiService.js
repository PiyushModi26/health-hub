// src/services/geminiService.js

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// This function now uses the 'gemini-1.5-flash-latest' model
export async function getMedicationsFromImage(imageBase64) {
  // --- CHANGE HERE: Updated model name in the URL ---
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  if (!API_KEY) {
    console.error("Gemini API key is not set in .env.local");
    return Promise.reject(new Error("API key is not configured."));
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
      // Make the error message more user-friendly
      throw new Error(errorData.error.message || "The model could not process the request.");
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error calling Gemini API for image scanning:", error);
    throw error; // Re-throw the error so the component can catch it
  }
}


// This function also now uses the 'gemini-1.5-flash-latest' model
export async function getHealthTip(question) {
  // --- CHANGE HERE: Updated model name in the URL ---
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
  
  if (!API_KEY) {
    console.error("Gemini API key is not set.");
    return "AI service is currently unavailable. Please check the API key configuration.";
  }

  const prompt = `
    You are a helpful AI health assistant. A user has the following question: "${question}".
    Provide a general, helpful, and safe tip. 
    IMPORTANT: Do NOT provide specific medical advice.
    ALWAYS conclude your response with the following disclaimer, exactly as written:
    "Disclaimer: This is an AI-generated tip and not a substitute for professional medical advice. Always consult with your doctor or pharmacist."
  `;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "The model could not process the request.");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching health tip:", error);
    return "Sorry, I was unable to fetch a health tip at this time.";
  }
}