import React, { useState } from 'react';
import { getHealthTip } from '../../services/geminiService';

const AiHealthTip = () => {
  const [question, setQuestion] = useState('');
  const [tip, setTip] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTip = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setTip('');
    const response = await getHealthTip(question);
    setTip(response);
    setIsLoading(false);
  };

  return (
    <div className="ai-health-tip">
      <h3>🤖 AI Health Assistant</h3>
      <p>Ask a general question about your medications or health.</p>
      <form onSubmit={handleGetTip}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., What are common side effects of painkillers?"
          rows="3"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Getting Tip...' : 'Get AI Tip'}
        </button>
      </form>
      {tip && (
        <div className="ai-tip-response">
          <p style={{ whiteSpace: 'pre-wrap' }}>{tip}</p>
        </div>
      )}
    </div>
  );
};

export default AiHealthTip;