import openai from './openai'
import { generateSectionTemplates, generateSectionContent } from "./prompts"
import { library } from './library'

const model = 'text-davinci-003'
const temperature = 1
const max_tokens = 300

const getImage = async prompt => {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbkcw_fNur-TbaJ-9WnydDYnQcVDYwAqxBw63G0xnX&s'
    const response = await openai.createImage({
        prompt,
        n: 1,
        size: "256x256",
    });



    return response.data.data[0].url;
}

const parseValue = async (key, type, matchedValue, title) => {
    if (type === 'image') {
        const imageUrl = await getImage(title + ': ' + matchedValue)
        return {[key]: imageUrl}
    }

    return {[key]: matchedValue}
}

const parseByType = async (comps, match, title) => {
    const parsedValuesPromises = Object.keys(comps).map(key => parseValue(key, comps[key], match[key]), title)
    const parsedValues = await Promise.all(parsedValuesPromises)
    const parsedMatches = Object.assign(...parsedValues)
    console.log(parsedValues)

    return parsedMatches
}

const buildSection = async (title, templateId, userInput) => {
    const template = library[templateId]
    const propertiesList = JSON.stringify(Object.keys(template.comps))
    const {question1, title1, answer1, question2, title2, answer2} = template

    const prompt = generateSectionContent(title, userInput, propertiesList, question1, title1, answer1, question2, title2, answer2)
    const completion = await openai.createCompletion({
        model,
        prompt,
        temperature,
        max_tokens
    })
    const text = completion.data.choices[0].text
    const rawMatch = JSON.parse(text)
    console.log('rawMatch', rawMatch)
    const match = await parseByType(template.comps, rawMatch, title)
    match.title = title

    return {
        id: template.id,
        match
    }
}

const buildTemplateOptions = () => {
    let templateOptions = ''
    const templateKeys = Object.keys(library);
    templateKeys.forEach((key, index) => {
        templateOptions += (index + 1) + '. ' + key + ' - ' + library[key].semantics + '\n'
    })

    console.log(templateOptions)
    return templateOptions
}

const getSections = async userInput => {
    const templateOptions = buildTemplateOptions()
    const prompt = generateSectionTemplates(userInput, templateOptions)
    console.log('getSections', openai)
    const completion = await openai.createCompletion({
        model,
        prompt,
        temperature,
        max_tokens
    })
    const text = completion.data.choices[0].text
    console.log('titles', text)
    const templates = JSON.parse(text)
    const matchPromises = templates.map(template => buildSection(template.title, template.id, userInput))
    const sections = await Promise.all(matchPromises)

    return sections
}

export const buildResponse = async userInput => {
    const sections = await getSections(userInput)

    return {
        original: userInput,
        sections: sections
    }
}
