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
                            <a href="https://nimhans.ac.in/" className="resource-link">24/7 Crisis Helpline</a>
                            <a href="https://www.mindfullivingcounselingservices.com/blog/2019/7/1/guided-mediation-for-anxiety-calm-place " className="resource-link">Meditation Guides</a>
                            <a href="https://www.google.com/search?sca_esv=29b9c0aed541efd5&sxsrf=ADLYWIIroo9zO7MygtNQgBX9pT2-I5m8NQ:1731475345028&q=anxiety+meditation+tools,+where+I+can+find+the+therapist,+can+u+provide+me+the+link&tbm=vid&source=lnms&fbs=AEQNm0CvspUPonaF8UH5s_LBD3JPX4RSeMPt9v8oIaeGMh2T2D1DyqhnuPxLgMgOaYPYX7OtOF4SxbM4YPsyWUMdeXRPZhCDnq-5Z-yoSNSuzzuqe1v23K9kPKRz1uyB_14kHSEb3OOmrYWRnFZzaeewHJSWNzpSd0sqOzXm-3Nu7MIUhHvGLeeL_VnavWJuW4KMA6IKkUrm2eZ54mtifdwjIRnavw6O6w&sa=X&ved=2ahUKEwj9uIKnyNiJAxWlTmwGHcrFAncQ0pQJegQIDxAB&biw=1536&bih=730&dpr=1.25#fpstate=ive&vld=cid:8b0af89a,vid:CJIXbibQ0jI,st:0" className="resource-link">Find a Therapist</a>
                            <a href="https://positivepsychology.com/anxiety-tools/" className="resource-link">Anxiety Management Tools</a>
                            <a href="https://www.youtube.com/watch?v=oeQfRtiY-ZM" className="resource-link">The 6 Phase Guided Meditation | Vishen Lakhiani</a>

                        </div>
                    </div>
                    <div className="resource-card">
                        <div className="disclaimer">
“Sustainability starts with inner peace; when we nurture our mental health, we contribute to a balanced world that thrives on well-being, empathy, and mindful living.” <br/>
                        – Maya Rivers                        </div>
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
