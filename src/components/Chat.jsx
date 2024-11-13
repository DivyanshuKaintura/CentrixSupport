import React, { useState } from "react";
import axios from "axios";
import './Chat.css';
import logo from "../assets/link-logo.png";

function Chat() {
    const [input, setInput] = useState("");
    const [file, setFile] = useState(null);
    const [isDocumentMode, setIsDocumentMode] = useState(false);
    const [response, updateResponse] = useState([{
        text: "Hello! I'm CentrixSupport and I'm always here to support you. How are you feeling today?",
        isBot: true
    }]);

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                await axios.post('http://localhost:5000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setIsDocumentMode(true);
                updateResponse([
                    ...response,
                    {
                        text: "Document uploaded successfully! You can now ask questions about the document.",
                        isBot: true
                    }
                ]);
            } catch (error) {
                console.error("Error uploading file:", error);
                updateResponse([
                    ...response,
                    {
                        text: "Error uploading document. Please try again.",
                        isBot: true
                    }
                ]);
            }
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        
        const userMessage = input;
        setInput("");
        
        updateResponse([
            ...response,
            { text: userMessage, isBot: false }
        ]);

        try {
            let apiResponse;
            if (isDocumentMode) {
                apiResponse = await axios.post('http://localhost:5000/api/query', {
                    query: userMessage
                });
                updateResponse(prev => [...prev, {
                    text: apiResponse.data.answer,
                    isBot: true
                }]);
            } else {
                apiResponse = await axios.post('http://localhost:5000/api/chat', {
                    message: userMessage
                });
                updateResponse(prev => [...prev, {
                    text: apiResponse.data.response,
                    isBot: true
                }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            updateResponse(prev => [...prev, {
                text: "Sorry, I encountered an error. Please try again.",
                isBot: true
            }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div>
            <div className="container">
                <div className="chat-section">
                    <div className="header">
                        CentrixSupport: Your 24/7 Wellness Companion
                    </div>
                    <div className="chat-container">
                        {response.map((message, index) => (
                            <div key={index} className={message.isBot ? "message bot-message" : "message user-message"}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        
                        <input 
                            type="file" 
                            accept=".pdf"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            {file ? '📄 PDF Uploaded' : '📎 Upload PDF'}
                        </label>
                        <input 
                            type="text" 
                            placeholder={isDocumentMode ? "Ask about the document..." : "Share your thoughts..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="greenbtn" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
                <div className="resources-section">
                    <div className="resource-card">
                        <h2>Helpful Resources</h2>
                        <div className="resource-links">
                            <a href="#" className="resource-link">24/7 Crisis Helpline</a>
                            <a href="#" className="resource-link">Meditation Guides</a>
                            <a href="#" className="resource-link">Find a Therapist</a>
                            <a href="#" className="resource-link">Anxiety Management Tools</a>
                        </div>
                    </div>
                    <div className="resource-card">
                        <div className="disclaimer">
                            Remember: While I'm here to support you, I'm not a replacement for professional mental health care. If you're in crisis, please reach out to emergency services or a crisis helpline.
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                KubeCentrix@DIT-Hackathon
            </div>
        </div>
    );
}

export default Chat;