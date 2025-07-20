const TelegramBot = require('node-telegram-bot-api');

// 這裡用環境變數（安全！）
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👑 Welcome to The King of Meme Official Group! Stay tuned for announcements and fun memes.");
});
