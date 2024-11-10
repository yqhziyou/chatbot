import React, { useState, useEffect, useRef } from 'react';
import { getChatResponse, resetChat } from '../services/ChatService';
import './conversation.css';

const Conversation = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const aiResponse = await getChatResponse(input);
            const aiMessage = { sender: 'ai', content: aiResponse.response }; // 提取 response 字段
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleReset = async () => {
        try {
            await resetChat();
            setMessages([]); // 清空本地消息历史
        } catch (error) {
            console.error('Error resetting chat:', error);
        }
    };

    return (
        <div className="conversation-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                    >
                        <div className="message-content">{message.content}</div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
                <button onClick={handleReset} className="reset-button">Reset</button>
            </div>
        </div>
    );
};

export default Conversation;
