const { Telegraf } = require('telegraf');
const axios = require('axios');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// 處理 /start 指令
bot.start((ctx) => ctx.reply('你好！我是 King of Meme Bot 🤖'));

// 處理 Meme 指令，隨機回傳一張 meme 圖片
bot.command('Meme', async (ctx) => {
  try {
    const response = await axios.get('https://api.imgflip.com/get_memes');
    if (response.data.success) {
      const memes = response.data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      await ctx.replyWithPhoto(randomMeme.url);
    } else {
      await ctx.reply('抱歉，暫時無法取得 meme 圖片 😢');
    }
  } catch (error) {
    console.error('取得 meme 失敗', error);
    await ctx.reply('發生錯誤，請稍後再試 🙏');
  }
});

// 啟動 webhook 模式
app.use(bot.webhookCallback('/'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

bot.telegram.setWebhook(`https://kingofmemebot.onrender.com`);
