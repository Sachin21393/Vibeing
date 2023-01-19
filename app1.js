import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(),
    temperature: 0.6,
  });
  console.log(completion.data)
  
function generatePrompt() {
 
    const my="i am feeling low"
  return `${my}`;
}