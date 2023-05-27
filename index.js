const TelegramBot = require('node-telegram-bot-api');
const sqlite3 = require('sqlite3').verbose();



const botToken = '6022820322:AAF2V8Po0P5R3JyRV6kb0Ox3wAZ9pcZfgkw';


const db = new sqlite3.Database('users.db');

db.run("CREATE TABLE IF NOT EXISTS Users (chat_id INTEGER PRIMARY KEY)");

let linkYoutube = `https://youtube.com/live/KxhER9bKsNk?feature=share`

function sendReminder(bot) {
    const message = `Трансляция начнется уже через час. Ссылка ${linkYoutube}`;
    db.all("SELECT chat_id FROM Users", function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        rows.forEach(function (row) {
          bot.sendMessage(row.chat_id, message).catch(console.error);
        });
      }
    });
  }
  
  const bot = new TelegramBot(botToken, { polling: true });

  bot.onText(/\/start/, function (message) {
    const chatId = message.chat.id;
    db.run("INSERT INTO Users(chat_id) VALUES(?)", chatId, function (err) {
      if (err) {
        console.error(err);
      } else {
        let messageFirst = `Привет, я бот с напоминанием о прямой трансляции! Я отправлю тебе напоминание за час до начала. А пока можете подписаться на наши социальные сети`;
        bot.sendMessage(chatId, messageFirst);
        let vk = `https://vk.com/dom.znaniy`
        let instagram = `https://instagram.com/d.znaniy?igshid=MzRlODBiNWFlZA==`
        let telegramchat = `https://t.me/d_znaniy`
        let dzen = `https://dzen.ru/domznaniy`
        bot.sendMessage(chatId, `Вконтакте: ${vk}`);
        bot.sendMessage(chatId, `Insragram: ${instagram}`);
        bot.sendMessage(chatId, `Наш телеграм канал: ${telegramchat}`);
        bot.sendMessage(chatId, `Наш яндекс дзен: ${dzen}`);
      }
    });
  });

  const schedule = require('node-schedule');


    const targetDate = new Date(2023, 4, 27, 18, 19, 0);
        const job = schedule.scheduleJob(targetDate, function() {
        sendReminder(bot);
        });


console.log('Бот запущен!');



  
