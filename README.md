# Pump-X API

这是Pump-X项目的API服务器。

## 功能特性

- AI聊天接口
- 健康检查端点
- CORS支持
- 错误处理
- 日志记录

## 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 环境变量

- `PORT`: 服务器端口号（默认：3000）
- `API_KEY`: AI服务API密钥
- `BOT_ID`: AI机器人ID
- `BASE_URL`: AI服务基础URL

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

## 生产部署

```bash
npm start
```

## API端点

### 健康检查
- GET `/health`
- 返回服务器状态和时间戳

### AI聊天
- POST `/api/chat`
- 请求体：
  ```json
  {
    "messages": [
      {
        "role": "user",
        "content": "你好"
      }
    ]
  }
  ```

## 部署说明

1. 确保设置了所有必要的环境变量
2. 安装依赖：`npm install`
3. 启动服务器：`npm start`

## 错误处理

服务器包含完整的错误处理机制：
- 请求超时
- AI服务调用失败
- 服务器内部错误 