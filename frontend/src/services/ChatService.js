// src/services/ChatService.js
import axios from 'axios';

// 将 BASE_URL 改为硬编码的明文 URL，避免环境变量问题
const BASE_URL = 'http://localhost:5001/api/chat';
console.log('BASE_URL:', BASE_URL);

export const getChatResponse = async (message) => {
    try {
        const response = await axios.post(`${BASE_URL}/gpt`, { message });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat response:', error);
        throw error;
    }
};

// 定义 resetChat 方法来调用 /reset 路径
export const resetChat = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/reset`);
        return response.data;
    } catch (error) {
        console.error('Error resetting chat:', error);
        throw error;
    }
};
