const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN);
const TARGET_CHAT_ID = '-1002738464953';
const ASSETS_PATH = '../kom-twitter-bot/assets';

// 找出 assets 資料夾中最後更新的圖片檔案
function getLatestImage() {
  const files = fs.readdirSync(ASSETS_PATH)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => ({
      file,
      mtime: fs.statSync(path.join(ASSETS_PATH, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);

  return files.length > 0 ? path.join(ASSETS_PATH, files[0].file) : null;
}

// 每天台北時間 15:00 自動執行
cron.schedule('0 7 * * *', async () => {
  const latestImage = getLatestImage();
  if (!latestImage) {
    console.log('⚠️ No meme image found to post.');
    return;
  }

  try {
    await bot.telegram.sendPhoto(TARGET_CHAT_ID, { source: latestImage }, { caption: '🤣 King of Meme Daily Meme!' });
    console.log(`✅ Meme sent to Telegram: ${latestImage}`);
  } catch (err) {
    console.error('❌ Failed to send meme:', err);
  }
});

// 啟動 bot（讓 webhook 可用）
bot.launch().then(() => {
  console.log('✅ Telegram bot 已啟動，自動排程啟用中');
});
