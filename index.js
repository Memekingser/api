const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY || '43e026fd-17f5-4a20-b73d-69280cdc1ae8';
const BOT_ID = process.env.BOT_ID || 'bot-20250228043007-l4qph';

// 创建OpenAI客户端实例
const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: process.env.BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3/bots',
});

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Sending request to AI API:', {
      model: BOT_ID,
      messages: req.body.messages
    });

    const completion = await openai.chat.completions.create({
      model: BOT_ID,
      messages: req.body.messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    });

    console.log('AI API response:', completion);
    res.json(completion);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      config: error.config
    });

    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: '请求超时，请稍后重试' });
    } else if (error.response) {
      res.status(error.response.status).json({
        error: '调用AI服务失败',
        details: error.response.data
      });
    } else {
      res.status(500).json({
        error: '服务器内部错误',
        details: error.message
      });
    }
  }
});

// 添加健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API服务器运行在 http://0.0.0.0:${port}`);
}); 