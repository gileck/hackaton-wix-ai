import { Configuration, OpenAIApi } from "openai"

const apiKey = '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';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai
