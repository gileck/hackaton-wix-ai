import {buildResponse} from './logic'

function returnMockData() {
  return {
    result: {
      original: value,
      sections: [
        {
          "id": "comp-leq228ux",
          "match": {
            "text1": "Pad Thai is a popular dish in Thailand, made with stir-fried noodles, vegetables, and a variety of spices",
            "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-kM84ZsWeMaV73vqGfx5iXXeZ/user-etUJUdBD2zN8qf5eWGOvPECf/img-2j86FkA5EZ60W6JKNLYUJa5F.png?st=2023-06-01T11%3A28%3A56Z&se=2023-06-01T13%3A28%3A56Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T21%3A37%3A23Z&ske=2023-06-01T21%3A37%3A23Z&sks=b&skv=2021-08-06&sig=cx2eWx7eBeAeSF5s2diQXHX2iYSub8KNGJE%2ByDnQnTg%3D",
            "title": "Best Foods to Eat in Thailand"
          }
        },
        {
          "id": "comp-leq228ux",
          "match": {
            "text1": "India is known for its delicious and diverse cuisine, with dishes ranging from spicy curries to sweet desserts. Popular dishes include tandoori chicken, samosas, and naan bread.",
            "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-kM84ZsWeMaV73vqGfx5iXXeZ/user-etUJUdBD2zN8qf5eWGOvPECf/img-x2kAhxQ6EydHLFisi9fqICLe.png?st=2023-06-01T11%3A28%3A55Z&se=2023-06-01T13%3A28%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A33%3A00Z&ske=2023-06-01T20%3A33%3A00Z&sks=b&skv=2021-08-06&sig=75MOvO4fl3SHO7lSkFEHNnXy8%2BK5Ys1Hvw1OxsLD/wg%3D",
            "title": "Best Foods to Eat in India"
          }
        },
        {
          "id": "comp-leq228ux",
          "match": {
            "text1": "Japan is known for its delicious cuisine, with sushi being one of the most popular dishes",
            "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-kM84ZsWeMaV73vqGfx5iXXeZ/user-etUJUdBD2zN8qf5eWGOvPECf/img-r2LawM80EvdPvOvYhC0b2OOc.png?st=2023-06-01T11%3A28%3A54Z&se=2023-06-01T13%3A28%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-01T07%3A16%3A32Z&ske=2023-06-02T07%3A16%3A32Z&sks=b&skv=2021-08-06&sig=M/mkCEQu5df6l0LCWPJaO2IzHGlAa1WSh3Qppvkt1ng%3D",
            "title": "Best Foods to Eat in Japan"
          }
        },
        {
          "id": "comp-leq228ux",
          "match": {
            "text1": "Tacos al Pastor is a popular Mexican dish made with marinated pork, pineapple, and spices, served on a warm tortilla",
            "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-kM84ZsWeMaV73vqGfx5iXXeZ/user-etUJUdBD2zN8qf5eWGOvPECf/img-rObuGqfC1gI4iF9ohHUBgbNY.png?st=2023-06-01T11%3A28%3A55Z&se=2023-06-01T13%3A28%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A16Z&ske=2023-06-01T20%3A31%3A16Z&sks=b&skv=2021-08-06&sig=quzzgxsehBaLXr9vCbg9n98DCludJh3UztZymHhkXiQ%3D",
            "title": "Best Foods to Eat in Mexico"
          }
        }
      ]
    }
  }
}
export default async function (req, res) {
  const value = req.body.value || '';


  if (value.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid value",
      }
    });
    return;
  }

  try {
    const result = await buildResponse(value)
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
