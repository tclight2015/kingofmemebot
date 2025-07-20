const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 10000;

// 替換為你的真實 Token！
const bot = new Telegraf('7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o');

// 基本指令處理
bot.start((ctx) => ctx.reply('你好！我是 King of Meme Bot 🤖'));
bot.hears('Meme', (ctx) => ctx.reply('🚀 King of Meme，敬請期待！'));

// Webhook 設定
app.use(bot.webhookCallback('/secret-path'));

// 這裡設置 webhook 到 Render 自己的 URL
bot.telegram.setWebhook('https://kingofmemebot.onrender.com/secret-path');

app.get('/', (req, res) => {
  res.send('King of Meme Bot Webhook Server is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
