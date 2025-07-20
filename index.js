const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 10000;

// 替換為你的真實 Token
const bot = new Telegraf('7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o');

bot.start((ctx) => ctx.reply('你好！我是 King of Meme Bot 🤖'));
bot.hears('Meme', (ctx) => ctx.reply('🚀 King of Meme，敬請期待！'));

// Webhook callback
app.use(bot.webhookCallback('/secret-path'));

// 設定 webhook URL
bot.telegram.setWebhook('https://kingofmemebot.onrender.com/secret-path');

app.get('/', (req, res) => {
  res.send('King of Meme Bot Webhook Server is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
