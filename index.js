const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// 目標發送群組 ID
const TARGET_CHAT_ID = '-1002738464953';

// 預設 meme 圖 URL pool
const memeImages = [
  'https://i.imgflip.com/30b1gx.jpg', // "Drake meme"
  'https://i.imgflip.com/1ur9b0.jpg', // "Distracted boyfriend"
  'https://i.imgflip.com/4/1bij.jpg', // "One does not simply"
  'https://i.imgflip.com/26am.jpg',   // "Grumpy cat"
  'https://i.imgflip.com/3si4.jpg'    // "Ancient aliens"
];

// 隨機挑選一張圖片
function getRandomMeme() {
  const index = Math.floor(Math.random() * memeImages.length);
  return memeImages[index];
}

// /start 指令
bot.start((ctx) => {
  ctx.reply('你好！我是 King of Meme Bot 🤖');
});

// 自動發送 meme（Render cronjob 用）
async function sendMeme() {
  try {
    const meme = getRandomMeme();
    await bot.telegram.sendPhoto(TARGET_CHAT_ID, meme, {
      caption: '🤣 King of Meme Daily Meme!'
    });
    console.log(`✅ Meme sent to Telegram group: ${TARGET_CHAT_ID}`);
  } catch (err) {
    console.error('❌ Failed to send meme:', err);
  }
}

sendMeme(); // 立即執行一次
