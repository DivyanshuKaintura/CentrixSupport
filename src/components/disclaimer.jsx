import React, { useState } from 'react';
import './disclaimer.css';

const DisclaimerPopup = ({ onProceed }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-modal">
        {/* Header */}
        <div className="disclaimer-header">
          <svg 
            className="disclaimer-icon"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <h2>Important Disclaimer</h2>
        </div>

        {/* Content */}
        <div className="disclaimer-content">
          <p>
            This chatbot is here to listen and support, but it's powered by AI and not a substitute for professional mental health help. For serious concerns or specific guidance, please talk to a licensed mental health professional. We're here to offer a friendly ear, but your well-being deserves personalized care!
          </p>

          {/* Checkbox Container */}
          <div className="disclaimer-checkbox-container">
            <div 
              onClick={() => setIsChecked(!isChecked)}
              className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
            >
              {isChecked && (
                <svg 
                  className="checkbox-icon" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              )}
            </div>
            
            <label 
              className="disclaimer-label"
              onClick={() => setIsChecked(!isChecked)}
            >
              I understand and acknowledge this disclaimer
            </label>
          </div>

          {/* Button */}
          <button
            onClick={() => isChecked && onProceed()}
            disabled={!isChecked}
            className={`proceed-button ${isChecked ? 'active' : 'disabled'}`}
          >
            Proceed to Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;