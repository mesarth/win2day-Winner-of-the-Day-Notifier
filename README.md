# win2day Winner of the Day Notifier

A script that checks if you are the winner of the day on [https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages](https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages). If you are, it notifies you via Telegram. The script is automatically executed once a day via GitHub Actions.

The winner of the day has to log in to the website at the end of the day to claim the prize. This script automates the process of checking if you are the winner of the day.

## Setup for your username

1. Clone this repository
2. Create a new Telegram bot and get the bot token and your chat id
    1. Create a new bot by talking to the [BotFather](https://t.me/botfather)
    2. Start a conversation with your bot (e.g. by visiting `https://t.me/<your_bot_name>`)
    3. Get your chat id by visiting `https://api.telegram.org/bot<YourBOTToken>/getUpdates`
3. Add the following secret environment variables to your repository (Settings → Secrets and variables → Actions → New repository secret):
   - `USERNAME_TO_CHECK`: Your win2day username (go to https://www.win2day.at/mysettings and copy the nickname)
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
   - `TELEGRAM_CHAT_ID`: Your Telegram chat id
