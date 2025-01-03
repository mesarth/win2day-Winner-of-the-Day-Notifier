const page = "https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages";
const winnerTextPrefix = "Heute ist die win2day Userin oder der win2day User mit dem Nickname ";
const winnerUsernameLength = 3;

const response = await fetch(page);
const html = await response.text();

// find the prefix in the html and get the winner

const winnerUsernameIndex = html.indexOf(winnerTextPrefix);
const winnerUsernameStart = winnerUsernameIndex + winnerTextPrefix.length;

const winnerUsername = html.substring(winnerUsernameStart, winnerUsernameStart + winnerUsernameLength);

console.log("The username of today's winner starts with: " + winnerUsername);
