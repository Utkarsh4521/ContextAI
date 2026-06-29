import React from 'react';

export default function WelcomeScreen({ onSuggestionClick }) {
    return (
        <div className="welcome">
            <div className="welcome-icon">🤖</div>
            <h2>Where should we begin!</h2>
            <p>I am an AI assistant powered by FastAPI. How can I help you today?</p>
            <div className="suggestions">
                <button className="suggestion-btn" onClick={() => onSuggestionClick("What can I do with Python?")}>
                    💡 What can I do with Python?
                </button>
                <button className="suggestion-btn" onClick={() => onSuggestionClick("FastAPI nedir ve neden kullanılır?")}>
                    🚀 What is fastapi?
                </button>
                <button className="suggestion-btn" onClick={() => onSuggestionClick("Bana bir Give me daily motivation ver")}>
                    ✨ Give me daily motivation
                </button>
            </div>
        </div>
    );
}
