require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start 指令，加 chat.id 輸出 log
bot.start((ctx) => {
  console.log('💡 chat.id:', ctx.chat.id);
  ctx.reply('你好！我是 King of Meme Bot 🤖');
});

bot.launch();

console.log('✅ Telegram bot 已啟動，等待 /start 指令…');
