// backend/services/aiService.js
const { OpenAI } = require("openai");

const openai = new OpenAI();

const generateAIResponse = async (messages) => {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        stream: true,
    });

    let responseText = '';

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            responseText += content;
        }
    }

    return responseText.trim();
};

module.exports = { generateAIResponse };
