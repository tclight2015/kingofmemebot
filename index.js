const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 10000;

// 你的真實 token 👇
const token = '7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '你好！我是 King of Meme Bot 🤖');
});

app.get('/', (req, res) => {
  res.send('King of Meme Bot is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
