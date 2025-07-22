const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);
const TARGET_CHAT_ID = -1002738464953; // 你的群組 ID

// 啟動 log
bot.launch().then(() => {
  console.log('✅ Telegram bot 已啟動');
  sendMeme(); // 啟動時自動發一張 meme
});

// /start 指令
bot.start((ctx) => {
  ctx.reply('你好！我是 King of Meme Bot 🤖');
  console.log(`💡 chat.id: ${ctx.chat.id}`);
});

// 發送 meme 圖片
async function sendMeme() {
  try {
    const response = await axios.get('https://api.imgflip.com/get_memes');
    if (response.data.success) {
      const memes = response.data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      await bot.telegram.sendPhoto(TARGET_CHAT_ID, randomMeme.url);
      console.log('✅ 自動 meme 已發送');
    } else {
      console.log('⚠️ 取圖失敗');
    }
  } catch (err) {
    console.error('❌ 發送錯誤:', err);
  }
}

// 錯誤處理
bot.catch((err, ctx) => {
  console.error(`Bot Error for ${ctx.updateType}`, err);
});
