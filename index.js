const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const TARGET_CHAT_ID = '-1002738464953';

// 讀取 assets 資料夾，找出最新檔案
function getLatestImage() {
  const assetsDir = path.join(__dirname, 'assets');
  const files = fs.readdirSync(assetsDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(assetsDir, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length > 0) {
    return path.join(assetsDir, files[0].name);
  } else {
    return null;
  }
}

// /start 指令
bot.start((ctx) => {
  ctx.reply('你好！我是 King of Meme Bot 🤖');
});

// 自動發送 meme（執行時立即）
async function sendMeme() {
  try {
    const latestImage = getLatestImage();
    if (latestImage) {
      await bot.telegram.sendPhoto(TARGET_CHAT_ID, { source: latestImage }, {
        caption: '🤣 King of Meme Daily Meme!'
      });
      console.log(`✅ 已發送最新 meme 圖片：${latestImage}`);
    } else {
      console.log('⚠️ assets 資料夾內沒有圖片可發送');
    }
  } catch (err) {
    console.error('❌ 發送 meme 發生錯誤:', err);
  }
}

sendMeme();  // 啟動時自動執行一次

// 啟動 bot（僅需要用於 /start 回覆）
bot.launch();

console.log('✅ Telegram bot ready（自動同步 assets）');
