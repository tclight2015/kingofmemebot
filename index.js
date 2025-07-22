const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

// 這裡填入剛剛取得的群組 ID
const TARGET_CHAT_ID = -1002738464953;

// Bot 啟動時 log 出來
bot.launch().then(() => {
  console.log('✅ Telegram bot 已啟動，等待指令...');
  // 自動發送一張 meme 到群組（示範）
  sendMeme();
});

// /start 指令
bot.start((ctx) => {
  ctx.reply('你好！我是 King of Meme Bot 🤖，隨時準備發送 MEME！');
  console.log(`💡 chat.id: ${ctx.chat.id}`);
});

// 隨機 meme 圖片
async function sendMeme() {
  try {
    const response = await axios.get('https://api.imgflip.com/get_memes');
    if (response.data.success) {
      const memes = response.data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      await bot.telegram.sendPhoto(TARGET_CHAT_ID, randomMeme.url);
      console.log('✅ Meme 已發送到群組');
    } else {
      console.log('⚠️ 無法取得 meme 圖片');
    }
  } catch (error) {
    console.error('❌ 發送 meme 失敗', error);
  }
}

// 預設錯誤處理
bot.catch((err, ctx) => {
  console.error(`Bot Error for ${ctx.updateType}`, err);
});
