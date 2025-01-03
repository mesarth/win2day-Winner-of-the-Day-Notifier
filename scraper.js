const page = "https://www.win2day.at/promotions-gewinnspiele/gewinner-des-tages";
const winnerTextPrefix = "Heute ist die win2day Userin oder der win2day User mit dem Nickname ";
const usernameToCheck = process.env.MORPH_USERNAME_TO_CHECK?.toLowerCase();
const winnerUsernameLength = 3;

const response = await fetch(page);
const html = await response.text();

// find the prefix in the html and get the winner

const winnerUsernameIndex = html.indexOf(winnerTextPrefix);
const winnerUsernameStart = winnerUsernameIndex + winnerTextPrefix.length;

const winnerUsername = html.substring(winnerUsernameStart, winnerUsernameStart + winnerUsernameLength).toLowerCase();

console.log("The username of today's winner starts with: " + winnerUsername);

if(!usernameToCheck) {
  console.log("Please set the MORPH_USERNAME_TO_CHECK environment variable to check if you are the winner.");
  process.exit(1);
}

if (usernameToCheck.includes(winnerUsername)) {
  console.log("You might be the winner of today's win2day promotion!");
} else {
  console.log("You have *not* won today's win2day promotion.");
}

