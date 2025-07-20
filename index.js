const express = require('express');
const { Telegraf } = require('telegraf');

const BOT_TOKEN = '你的真實 Bot Token';
const bot = new Telegraf(BOT_TOKEN);
const app = express();

bot.start((ctx) => ctx.reply('你好！我是 King of Meme Bot 🤖'));
bot.hears(/meme/i, async (ctx) => {
  await ctx.reply('這裡給你一張迷因圖片 😎');
});

app.use(bot.webhookCallback('/secret-path')); // 你可以自訂 webhook 路徑

app.get('/', (req, res) => {
  res.send('King of Meme Bot is running with Webhook!');
});

app.listen(10000, async () => {
  console.log('Server running on port 10000');

  // 這裡要設定 Webhook URL
  const webhookUrl = 'https://你的-render-service-url.onrender.com/secret-path';
  await bot.telegram.setWebhook(webhookUrl);

  console.log(`Webhook set to ${webhookUrl}`);
});
