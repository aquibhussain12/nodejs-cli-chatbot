const { OpenAI} = require('openai');
const readline = require('readline');

const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({

    apikey: process.env.OPENAI_API_KEY,
 });

 const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  userInterface.prompt();
  userInterface.on('line', (input) => {
    const userInput = input.trim();

openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content":userInput}],
  }).then(response => {
    console.log(response.choices[0].message.content);
    userInterface.prompt();
  }).catch(error => {
    console.log(error);
  });
});

userInterface.on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});