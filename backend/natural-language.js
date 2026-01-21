const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the available blocks structure for the AI to understand
const AVAILABLE_BLOCKS = {
  keyword: [
    { type: "all-words", label: "All of these words", requiresValue: true },
    { type: "exact-phrase", label: "Exact Phrase", requiresValue: true },
    { type: "or", label: "Any of these words (OR)", requiresValue: true },
    { type: "none-words", label: "None of these words", requiresValue: true },
    { type: "hashtags", label: "These Hashtags", requiresValue: true },
  ],
  user: [
    { type: "from", label: "From these Accounts", requiresValue: true },
    { type: "to", label: "To these Accounts", requiresValue: true },
    { type: "mention", label: "Mentioning these Accounts", requiresValue: true },
    { type: "list", label: "List", requiresValue: true },
  ],
  media: [
    { type: "filter-media", label: "Has Media", requiresValue: false },
    { type: "filter-images", label: "Has Images", requiresValue: false },
    { type: "filter-video", label: "Has Videos", requiresValue: false },
    { type: "filter-links", label: "Has Links", requiresValue: false },
    { type: "url", label: "URL Contains", requiresValue: true },
  ],
  date: [
    { type: "since", label: "Since Date", requiresValue: true },
    { type: "until", label: "Until Date", requiresValue: true },
  ],
  engagement: [
    { type: "min-retweets", label: "Min Retweets", requiresValue: true },
    { type: "min-faves", label: "Min Likes", requiresValue: true },
    { type: "min-replies", label: "Min Replies", requiresValue: true },
    { type: "no-retweets", label: "No Retweets", requiresValue: false },
    { type: "question", label: "Is Question", requiresValue: false },
  ],
};

const SYSTEM_PROMPT = `You are a Twitter search query builder. Your task is to convert natural language queries into structured search blocks.

Available blocks and their formats:
${JSON.stringify(AVAILABLE_BLOCKS, null, 2)}

Return a JSON array of blocks, where each block contains:
- type: the block type from the available blocks
- value: the value for the block (if requiresValue is true)
- category: the category the block belongs to

Example input: "Find tweets about climate change with at least 100 likes from verified users"
Example output:
{
  "blocks": [
    {
      "type": "all-words",
      "value": "climate change",
      "category": "keyword"
    },
    {
      "type": "min-faves",
      "value": "100",
      "category": "engagement"
    }
  ]
}`;

const convertNaturalQuery = async (query) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query }
    ],
    temperature: 0.2,
    max_tokens: 500,
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(completion.choices[0].message.content);

  // Process date blocks to ensure proper format
  result.blocks = result.blocks.map(block => {
    if (block.type === "since" || block.type === "until") {
      if (block.value.toLowerCase() === "yesterday") {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        block.value = yesterday.toISOString().split('T')[0];
      } else if (block.value.toLowerCase() === "today") {
        block.value = new Date().toISOString().split('T')[0];
      }
    }
    return block;
  });

  return result;
};

module.exports = { convertNaturalQuery };
