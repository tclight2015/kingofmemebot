const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o';
const bot = new TelegramBot(token, { polling: true });

// Express server (Render 用)
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('King of Meme Bot is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// /start 指令
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '你好！我是 King of Meme Bot 🤖');
});

// 文字訊息 "Meme"
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (text === 'meme') {
    // 這裡用現成的 meme URL，你可以改成你自己的 meme 圖片庫
    const memeUrls = [
      'https://i.imgur.com/8fFM4Rk.jpeg',
      'https://i.imgur.com/YOe2cUg.jpeg',
      'https://i.imgur.com/w3duR07.png'
    ];
    const randomMeme = memeUrls[Math.floor(Math.random() * memeUrls.length)];
    bot.sendPhoto(chatId, randomMeme);
  }
});
