# win2day Winner of the Day Notifier

This [morph.io](https://morph.io) crawler script runs once a day and checks if you are the winner of the day on [https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages](https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages). If you are, it sends you a notification via Telegram.

The winner of the day has to log in to the website at the end of the day to claim the prize. This crawler automates the process of checking if you are the winner of the day.

## Setup

1. Clone this repository
2. Add new cralwer on [morph.io](https://morph.io) and link it to your cloned repository
3. Create a new Telegram bot and get the bot token and your chat id
    1. Create a new bot by talking to the [BotFather](https://t.me/botfather)
    2. Start a conversation with your bot (e.g. by visiting `https://t.me/<your_bot_name>`)
    3. Get your chat id by visiting `https://api.telegram.org/bot<YourBOTToken>/getUpdates`
4. Add the following secret environment variables to your crawler on [morph.io](https://morph.io):
   - `MORPH_USERNAME_TO_CHECK`: Your win2day username (go to https://www.win2day.at/mysettings and copy the nickname)
   - `MORPH_TELEGRAM_BOT_TOKEN`: Your Telegram bot token
   - `MORPH_TELEGRAM_CHAT_ID`: Your Telegram chat id
5. Enable to run the crawler once a day (auto run)