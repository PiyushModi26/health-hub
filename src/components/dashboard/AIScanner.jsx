import React, { useState } from 'react';
import { getMedicationsFromImage } from '../../services/geminiService';

const AIScanner = ({ onScanComplete, setFormError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setFormError('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64String = reader.result.split(',')[1];
        const extractedMeds = await getMedicationsFromImage(base64String);

        if (extractedMeds && extractedMeds.length > 0) {
          onScanComplete(extractedMeds[0]);
        } else {
          setFormError("AI couldn't find any medications. Please try another image or add manually.");
        }
      } catch (error) {
        setFormError(`AI Scan Failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      setFormError("Failed to read the image file.");
    };
  };

  return (
    <div className="ai-scanner">
      <h3>✨ AI Prescription Scanner</h3>
      <p>Upload a photo of your prescription and let our AI fill in the details for you!</p>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <label className="upload-btn">
          <span>⬆️ Upload Prescription</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
        </label>
      )}
    </div>
  );
};

export default AIScanner;