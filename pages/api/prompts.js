
export function generateSectionContent(title, question, propertiesList, question1, title1, answer1, question2, title2, answer2) {
    const prompt = `
The content of a section with the provided title, giving details for the provided question.
The response is provided as a JSON, with the following properties: ${propertiesList}.

Question: ${question1}
Title: ${title1}
Content: ${answer1}

Question: ${question2}
Title: ${title2}
Content: ${answer2}

Question: ${question}
Title: ${title}
Content: 
`

    return prompt;
}

export function generateSectionTemplates(question, templateOptions) {
    const prompt = `
Describe the structure of a page that answers the question, by detailing the sections of the page.
Each section would have a title and a template, where the template should best fit the content that should go into the section.
Prefer using images if it is relevant.
The response should be structured as a JSON.
The possible template options are: ${templateOptions}

Prefer shortStructuredDescriptionWithOneMedia if possible

Examples:
Question: What should I do in Tel Aviv?
Answer: [{"title": "About Tel Aviv", "id": "shortStructuredDescriptionWithOneMedia"}, {"title": "Restaurants", "id": "shortStructuredDescriptionWithOneMedia"}, {"title": "Attractions", "id": "longDescription"}]

Question: Describe an itinerary for a trip to Thailand
Answer: [{"title": "day 1-3, arrival, Bangkok", "id": "shortStructuredDescriptionWithOneMedia"}, {"title": "day 4-5, Chiang Mai", "id": "shortStructuredDescriptionWithOneMedia"}, {"title": "day 6, Koh Samui", "id": "shortStructuredDescriptionWithOneMedia"}, {"title": "day 7-8, Ayutthaya", "id": "shortStructuredDescriptionWithOneMedia"}, {"title": "day 9, Bangkok, flight back", "id": "shortStructuredDescriptionWithOneMedia"}]
Answer: day 1-3, arrival, Bangkok|day 4-5, Chiang Mai|day 6, Koh Samui|day 7-8, Ayutthaya|day 9, Bangkok, flight back

Question: ${question}.
Answer:


`

    return prompt;
}
