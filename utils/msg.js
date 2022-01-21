const { WebClient } = require("@slack/web-api");

// Read a token from the environment variables
// const token = process.env.SLACK_TOKEN;
const token = "xoxb-3013469989952-2986852834565-vJ0S2kDYp8ccoVe1WaDOCsvD";

// Initialize
const web = new WebClient(token);

// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
// const conversationId = "@sgaikwad";
const conversationId = "#orders";

const msg = async (input) => {
  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
  const result = await web.chat.postMessage({
    text: input,
    channel: conversationId,
  });

  // The result contains an identifier for the message, `ts`.
  console.log(
    `Successfully send message ${result.ts} in conversation ${conversationId}`
  );
};

module.exports = { msg };
