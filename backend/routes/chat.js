// backend/routes/chat.js
const express = require('express');

const { getChatResponse, saveConversation } = require('../controllers/chatController');


const router = express.Router();

router.post('/gpt', getChatResponse); // POST 请求，用于获取 AI 回复
router.post('/reset', saveConversation); // POST 请求，用于获取 AI 回复

module.exports = router;
