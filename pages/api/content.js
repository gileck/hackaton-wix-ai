const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const categoryPlaceholder = '###CATEGORY###'
const descriptionPlaceholder = '###DESCRIPTION###'
const outlinePlaceholder = '###OUTLINE###'

const systemMessage = `
You are a creative writer that writes website content for a specific business type and fits text content into a JSON format. 
The input will include a category,  additional information and an outline JSON. The outline JSON contains keys with names of sections in a page, and each section contains keys of content for that page, text fields or buttons. The values are either an example of a content that could fit the field, or a description of what the field could contain which starts with "I'm a paragraph", which should be replaced.
The output should be a JSON in an identical structure to the input outline JSON. All keys need to remain as is, only the values of content properties should be changed to apply to the input category and description. Keep the length of texts per content field as in the example provided.
`

const inputMessageTemplate = `
category - ${categoryPlaceholder}.
additional information - ${descriptionPlaceholder}.
outline - ${outlinePlaceholder}
`


const buildResponse = async (category, description, outline) => {
    const inputMessage = inputMessageTemplate
        .replace(categoryPlaceholder, category)
        .replace(descriptionPlaceholder, description)
        .replace(outlinePlaceholder, JSON.stringify(outline))

    console.log('systemMessage', systemMessage)
    console.log('inputMessage', inputMessage)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 2048,
        temperature: 1,
        messages: [
            {role: "system", content: systemMessage},
            {role: "user", content: inputMessage}
        ]
    })

    const result = completion.data.choices[0].message.content
    console.log(completion.data.choices)

    return result
}

const getContent = async (req, res)=> {
    console.log('req.body', req.body)

    if (!req.body) {
        res.status(400).json({
            error: {
                message: "Please enter a valid value",
            }
        });
        return;
    }

    try {
        const params = req.body
        const {category, description, outline} = params

        const result = await buildResponse(category, description, outline)
        res.status(200).json({ result})
    } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

module.exports = {
    getContent
}
