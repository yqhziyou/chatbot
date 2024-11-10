const { generateAIResponse } = require('../services/aiService');

let combine = { messages: [] };  // Initialize combine with an empty messages array

const getChatResponse = async (req, res) => {
    const { message } = req.body;

    // Add the user's message to the combine array
    combine.messages.push({ role: "user", content: message });

    try {
        // 将整个消息历史传递给 generateAIResponse
        const aiResponse = await generateAIResponse(combine.messages);

        // Log AI response and add it to combine array as "system" role
        console.log('AI Response:', aiResponse);
        combine.messages.push({ role: "system", content: aiResponse });

        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('Error details:', error);  // Print full error details
        res.status(500).json({ error: 'Failed to generate response', details: error.message });
    }
};

// 清除对话上下文的API
const saveConversation = async (req, res) => {
    try {
        // 清除 combine 中的消息数组
        combine.messages = [];
        res.status(200).json({ message: 'Conversation context cleared successfully' });
    } catch (error) {
        console.error('Error clearing conversation:', error);
        res.status(500).json({ error: 'Failed to clear conversation', details: error.message });
    }
};

module.exports = { getChatResponse, saveConversation };
