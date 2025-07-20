const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 10000;

// 替換成你的 Telegram Bot Token
const bot = new Telegraf('7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o');

// 固定 Meme 圖片庫
const memeImages = [
  'https://i.imgur.com/1.jpg',
  'https://i.imgur.com/2.jpg',
  'https://i.imgur.com/3.jpg',
  'https://i.imgur.com/4.jpg',
  'https://i.imgur.com/5.jpg',
  'https://i.imgur.com/6.jpg',
  'https://i.imgur.com/7.jpg',
  'https://i.imgur.com/8.jpg',
  'https://i.imgur.com/9.jpg',
  'https://i.imgur.com/10.jpg'
];

// Bot 回覆 /start
bot.start((ctx) => ctx.reply('你好！我是 King of Meme Bot 🤖'));

bot.hears('Meme', (ctx) => {
  const meme = memeImages[Math.floor(Math.random() * memeImages.length)];
  ctx.replyWithPhoto(meme);
});

// Express Server
app.get('/', (req, res) => {
  res.send('King of Meme Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

bot.launch();
