const TelegramBot = require('node-telegram-bot-api')
const sqlite3 = require('sqlite3').verbose()

const botToken = '6769571066:AAF8bRZ_Cz6jVoh_TV1s5Hhmnc3ZgI020ek'

const db = new sqlite3.Database('users.db')

db.run('CREATE TABLE IF NOT EXISTS Users (chat_id INTEGER PRIMARY KEY)')

let linkYoutube = `https://youtube.com/live/KxhER9bKsNk?feature=share`

function sendReminder(bot) {
	const message = `😎 Участники!

	Торопитесь проверить свои устройства и присоединиться в 12:00 мск к мегаполезному вебинару "День открытых дверей в «Доме Знаний»"! 
	
	Руководитель онлайн-школы, преподаватели и тьюторы подробно расскажут о том, как работает онлайн-школа, какие документы она должна иметь, чтоб предоставлять качественное обучение, а вы сможете задать свои вопросы!
	
	🎉 Настраивайтесь на получение полезной
	информации из первых уст! ${linkYoutube}`
	db.all('SELECT chat_id FROM Users', function (err, rows) {
		if (err) {
			console.error(err)
		} else {
			rows.forEach(function (row) {
				bot.sendMessage(row.chat_id, message).catch(console.error)
			})
		}
	})
}

function sendReminder2(bot) {
	const message = `⚡️Присоединяйтесь, чтобы не пропустить!

	🕘 11:45 по мск, а значит, онлайн-школа «Дом Знаний» вот-вот начнет вебинар День открытых дверей!
	
	На нем преподаватели во главе с генеральным директором расскажут о принципах работы онлайн-школы, о том, кому идеально подойдет онлайн-образование, как получить скидки и льготы на обучение, а также ответят на ваши вопросы о школьном онлайн-образовании!
	
	🎉 Мы ждем именно вас! ${linkYoutube}`
	db.all('SELECT chat_id FROM Users', function (err, rows) {
		if (err) {
			console.error(err)
		} else {
			rows.forEach(function (row) {
				bot.sendMessage(row.chat_id, message).catch(console.error)
			})
		}
	})
}

function sendReminder3(bot) {
	const message = `📣 Вебинар окончен! Но для вас мы подготовили его запись! 🏠 Вебинар "День открытых дверей «Дома Знаний»" окончен!
	
	😔 Нам жаль, что вас не было с нами. Надеемся, что в следующий раз вы сможете подключиться к нашим эфирам!
	
	В этот чат-бот будут приходить новости школы, информация о мероприятиях, акциях и скидках.
	
	А также подпишитесь на наш Телеграм-канал, чтобы точно не потерять https://t.me/d_znaniy.
	
	🔥 Следите за нами и стремитесь к знаниям с любовью! ${linkYoutube}`
	db.all('SELECT chat_id FROM Users', function (err, rows) {
		if (err) {
			console.error(err)
		} else {
			rows.forEach(function (row) {
				bot.sendMessage(row.chat_id, message).catch(console.error)
			})
		}
	})
}

const bot = new TelegramBot(botToken, { polling: true })

bot.onText(/\/start/, function (message) {
	const chatId = message.chat.id
	db.run('INSERT INTO Users(chat_id) VALUES(?)', chatId, function (err) {
		if (err) {
			console.error(err)
		} else {
			let messageFirst = `Добро пожаловать!
			Вы зарегистрировались в чат-боте онлайн-школы «‎Дом Знаний»!
			27 мая в 12:00 мск пройдет вебинар “День открытых дверей в «Доме Знаний»”.
			А для того, чтобы не потерять с вами связь, мы напомним вам о вебинаре за один день до трансляции!

			🔥 Приходите на вебинар, и узнаете:

			▪️ Как работает «Дом Знаний»?
			▪️ Какие форматы обучения есть в школе?
			▪️ Кому подойдет онлайн-обучение?
			▪️ Как ученики сдают ОГЭ и ЕГЭ и получают аттестат?
			▪️ Как зачислить ребенка в онлайн-школу?
			▪️ О скидках и льготах, благодаря которым можно сделать обучение выгоднее!

			✍️ А также сможете задать свои вопросы генеральному директору и преподавателям!

			Обещаем, будет полезно!`
			bot.sendMessage(chatId, messageFirst)
		}
	})
})

const schedule = require('node-schedule')

const inAnHourDate = new Date(2024, 4, 27, 11, 0, 0)
const inFifteenMinutesDate = new Date(2024, 4, 27, 11, 45, 0)
const afterDate = new Date(2024, 4, 27, 14, 0, 0)
const job1 = schedule.scheduleJob(inAnHourDate, function () {
	sendReminder(bot)
})

const job2 = schedule.scheduleJob(inFifteenMinutesDate, function () {
	sendReminder2(bot)
})

const job3 = schedule.scheduleJob(afterDate, function () {
	sendReminder3(bot)
})

console.log('Бот запущен!')
