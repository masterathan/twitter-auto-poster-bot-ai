// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Create a tweet about: Chainbase and Berachain random placements Native token: $C , $BERA random placements Topic: like hype anything else that excites that related to Chainbase and Berachain example: zircons, AI random placements Use the hashtags:#ChainbaseCOMPETITION #AI #AIAgent @ChainbaseHQ @berachain tag @BenjaminOnIP and comment about $IP of @StoryProtocol in random placements, Ensure its unique ,human-like, and non-repetitive content and first opening sentence shouldn't be repetitive it should have a hype vibes, with a distinct emoji thread while keeping it under 250 characters, and avoid using in the sentence [keep it all in one sentence]";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
