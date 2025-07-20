const express = require('express');
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 10000;
const botToken = '7524117562:AAHUW-QLrXkaXeIEkw-L5zxmiDc70V-Fn1o';
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply('你好！我是 King of Meme Bot 🤖'));
bot.hears(/Meme/i, async (ctx) => {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    if (data.success) {
      const memes = data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      await ctx.replyWithPhoto(randomMeme.url);
    } else {
      await ctx.reply('😅 無法取得 meme 圖片，請稍後再試！');
    }
  } catch (error) {
    console.error('Fetch meme error:', error);
    await ctx.reply('⚠️ 發生錯誤，請稍後再試！');
  }
});

app.get('/', (req, res) => {
  res.send('King of Meme Bot is running!');
});

bot.launch();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
