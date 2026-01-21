const OpenAI = require('openai');
const prompt = require('./prompt.json');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeTweets(query, tweets) {
  if (!tweets || tweets.length === 0) {
    return {
      summary: "No tweets to analyze.",
      topics: [],
      sentiment: "neutral",
      insights: [],
      relatedQuestions: []
    };
  }

  try {
    const tweetTexts = tweets.map(tweet =>
      `Tweet by ${tweet.user_name} (@${tweet.user_screen_name}): "${tweet.text}"`
    ).join("\n\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user.replace('${query}', query).replace('${tweetTexts}', tweetTexts) }
      ],
      temperature: 0.2,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);

    // Ensure sentiment is a string
    if (Array.isArray(analysis.sentiment)) {
      analysis.sentiment = analysis.sentiment[0] || "neutral";
    }

    return analysis;
  } catch (error) {
    return {
      summary: "An error occurred during analysis.",
      topics: [],
      sentiment: "unknown",
      insights: ["Analysis service temporarily unavailable"],
      relatedQuestions: []
    };
  }
}

module.exports = { analyzeTweets };
