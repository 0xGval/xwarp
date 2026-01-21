const express = require('express');
const router = express.Router();
const axios = require('axios');
const { analyzeTweets } = require('./ai');
const { convertNaturalQuery } = require('./natural-language');
const { aiLimiter } = require('./middleware/rateLimiter');

// Search endpoint
router.post('/ai-search', aiLimiter, async (req, res) => {
  const { query, section = 'latest', limit = 5 } = req.body;

  // Validate request body
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  if (!['latest', 'top'].includes(section)) {
    return res.status(400).json({ error: 'Invalid section parameter' });
  }

  const validLimit = Math.max(1, Math.min(20, Number(limit) || 5));

  try {
    const options = {
      method: 'GET',
      url: 'https://twitter154.p.rapidapi.com/search/search',
      params: {
        query: query,
        section: section,
        limit: validLimit.toString()
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'twitter154.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    const processedResults = {
      results: response.data.results ? response.data.results.map(tweet => ({
        id: tweet.tweet_id,
        user_name: tweet.user ? tweet.user.name : "Unknown",
        user_screen_name: tweet.user ? tweet.user.username : "unknown",
        text: tweet.text,
        created_at: tweet.creation_date,
        retweet_count: tweet.retweet_count || 0,
        favorite_count: tweet.favorite_count || 0,
        reply_count: tweet.reply_count || 0,
        user_profile_image_url: tweet.user ? tweet.user.profile_pic_url : null
      })) : []
    };

    if (processedResults.results.length > 0) {
      const analysis = await analyzeTweets(query, processedResults.results);
      return res.json({
        originalQuery: query,
        results: processedResults,
        analysis: analysis
      });
    } else {
      return res.json({
        originalQuery: query,
        results: processedResults,
        analysis: {
          summary: "No tweets found to analyze.",
          topics: [],
          sentiment: "neutral",
          insights: ["No data available for analysis"],
          relatedQuestions: []
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      originalQuery: query,
      error: 'Failed to fetch results from Twitter API',
      errorDetail: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Natural language endpoint
router.post('/natural-language', aiLimiter, async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  try {
    const result = await convertNaturalQuery(query);
    const twitterQuery = generateTwitterQuery(result.blocks);

    res.json({
      received: true,
      query: query,
      blocks: result.blocks,
      generatedQuery: twitterQuery,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to process natural language query',
      errorDetail: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helper function to generate Twitter query from blocks
function generateTwitterQuery(blocks) {
  const keywordTypes = ["all-words", "exact-phrase", "or", "none-words", "hashtags"];
  const keywordBlocks = blocks.filter(block => keywordTypes.includes(block.type));
  const otherBlocks = blocks.filter(block => !keywordTypes.includes(block.type));

  const processBlock = (block) => {
    switch (block.type) {
      case "all-words":
        return block.value;
      case "exact-phrase":
        return `"${block.value}"`;
      case "or":
        return `(${block.value.split(" ").join(" OR ")})`;
      case "none-words":
        return block.value.split(" ").map(word => `-${word}`).join(" ");
      case "hashtags":
        return block.value.split(" ").map(tag => `#${tag}`).join(" ");
      case "from":
        return `from:${block.value}`;
      case "to":
        return `to:${block.value}`;
      case "mention":
        return `@${block.value}`;
      case "list":
        return `list:${block.value}`;
      case "since":
        return `since:${block.value}`;
      case "until":
        return `until:${block.value}`;
      case "min-retweets":
        return `min_retweets:${block.value}`;
      case "min-faves":
        return `min_faves:${block.value}`;
      case "min-replies":
        return `min_replies:${block.value}`;
      default:
        return block.type;
    }
  };

  const keywordParts = keywordBlocks.map(processBlock).filter(Boolean);
  const otherParts = otherBlocks.map(processBlock).filter(Boolean);

  return [...keywordParts, ...otherParts].join(" ");
}

module.exports = router;
