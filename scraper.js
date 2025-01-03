import sqlite3 from "sqlite3";

const page = process.env.MORPH_WINNER_PAGE_URL || "https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages";
const winnerTextPrefix = process.env.MORPH_WINNER_TEXT_PREFIX || "Heute ist die win2day Userin oder der win2day User mit dem Nickname ";
const usernameToCheck = process.env.MORPH_USERNAME_TO_CHECK?.toLowerCase();
const winnerUsernameLength = 3;

const sendTelegramNotification = async (message) => {
  const telegramBotToken = process.env.MORPH_TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.MORPH_TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: message,
      parse_mode: "HTML"
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to send Telegram notification: ${response.statusText}`);
  }
  console.log("Telegram notification sent successfully.");
}

const saveUsernameToDatabase = (username) => {
  console.log("Saving username to database...");
  const db = new sqlite3.Database("data.sqlite");
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS data (username TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    const statement = db.prepare("INSERT INTO data (username) VALUES (?)");
    statement.run(username);
    statement.finalize();
    console.log("Username saved to database.");
  });
}

const response = await fetch(page);
const html = await response.text();

const winnerUsernameIndex = html.indexOf(winnerTextPrefix);
const winnerUsernameStart = winnerUsernameIndex + winnerTextPrefix.length;

const winnerUsername = html.substring(winnerUsernameStart, winnerUsernameStart + winnerUsernameLength).toLowerCase();
saveUsernameToDatabase(winnerUsername);

console.log("The username of today's winner starts with: " + winnerUsername);

if(!usernameToCheck) {
  console.log("Please set the MORPH_USERNAME_TO_CHECK environment variable to check if you are the winner.");
  process.exit(1);
}

if (usernameToCheck.includes(winnerUsername)) {
  console.log("You might be the winner of today's win2day promotion!");
  await sendTelegramNotification(`<b>win2day Daily Promotion Winner</b>\nYou might be the winner of today's win2day promotion! The username starts with: <i>${winnerUsername}</i>\n<a href="${page}">${page}</a>`);
} else {
  console.log("You have *not* won today's win2day promotion.");
}

