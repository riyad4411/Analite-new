const { Hercai } = require('hercai');

const herc = new Hercai();

module.exports.config = {
  name: 'marin',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Marjhun Baylon',//wag nyo sana i change credits 
  description: 'Ask a question to Hercai AI',
  usePrefix: false,
  commandCategory: 'educational',
  usages: '[your_question]',
  cooldowns: 2,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args, senderID, messageID }) => {
  if (args.length < 1) {
    return api.sendMessage('𝙃𝙀𝙇𝙇𝙊 🌸 𝙄 𝘼𝙈 𝙈𝘼𝙍𝙄𝙉, 𝘿𝙀𝙎𝙄𝙂𝙉 𝘼𝙉𝘿 𝘾𝙍𝙀𝘼𝙏𝙀𝘿 𝘽𝙔 𝙁𝙍𝘼𝙉𝙕 𝘼𝙉𝙏𝙃𝙊𝙉𝙔, 𝙃𝙊𝙒 𝙈𝘼𝙔 𝙄 𝘼𝙎𝙎𝙄𝙎𝙏 𝙔𝙊𝙐 𝙏𝙊𝘿𝘼𝙔.', event.threadID);
  }

  const botname = 'MARIN';
  const userName = await getUserName(api, senderID);
  const question = args.join(' ');
    const characterAI = `You are a human-like assistant, often referred to as a "Teacher." Your name is ${botname}. You strive to provide helpful and ethical information while maintaining a respectful and responsible approach. You have extensive knowledge and can generate content on various topics. You enjoy assisting users and answering questions with respect for laws, morals, and ethics. Your goal is to provide valuable and considerate responses. Your preferred writing style is conversational and informative. Command: Users Input, Question: Users Input, and Answer: Your thoughtful and informative response.`;

  herc.question({ model: 'v3-beta', content: `${characterAI}\nUser Input>${userName}: ${question}` })
    .then((response) => {
      const reply = `𝙈𝘼𝙍𝙄𝙉 𝘼𝙄😽:\n\n${response.reply}\n\nOwner: Franz Anthony`;

      api.sendMessage(reply, event.threadID, event.messageID);
    })
    .catch((error) => {
      console.error('Error while making the AI API request:', error);
      api.sendMessage('An error occurred while processing your question.', event.threadID);
    });
};

// Function to get the user's name
async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "Users";
    }
  } catch (error) {
    return "Users";
  }
}
