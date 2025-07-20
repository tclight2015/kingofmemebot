const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "你好！我是 King of Meme Bot 🤖");
});

bot.onText(/\/meme/, (msg) => {
  const memeUrl = 'https://i.imgur.com/W3Wq0jY.jpg';  // 這裡是隨便找的一張迷因圖，你可換成自己想要的
  bot.sendPhoto(msg.chat.id, memeUrl, { caption: "來張迷因圖給你 😂" });
});

const app = express();

app.get('/', (req, res) => {
  res.send('King of Meme Bot is running!');
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
