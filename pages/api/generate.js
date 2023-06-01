import {buildResponse} from './logic'

function returnMockData() {
    return {
        "result": {
            "original": "which cities in europe are the best to visit?",
            "sections": [{
                "id": "comp-leq228ux",
                "match": {
                    "text1": "Rome is an iconic city in Italy offering plenty of attractions and sites to explore such as the Colosseum, the Trevi Fountain, and the Pantheon.",
                    "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ScnAS4Ux3qyBQl103o7zWy0j/user-nBd5rVlHBSuj6jZ8aUjGPDDZ/img-CvipHxeeFFcGCETrJWgXOvBY.png?st=2023-06-01T16%3A24%3A50Z&se=2023-06-01T18%3A24%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-01T11%3A56%3A05Z&ske=2023-06-02T11%3A56%3A05Z&sks=b&skv=2021-08-06&sig=KXnkDJ5X9gAgtU7J/GYP0nsllBbZiTohPxnVnLhZcnc%3D",
                    "followups": ["what are the best restaurants in Rome?", "what are the best tourist attractions in Rome?"],
                    "title": "Rome, Italy"
                }
            }, {
                "id": "comp-leq228ux",
                "match": {
                    "text1": "Paris is considered one of the most romantic cities in the world, and is known for its grandiose art, culture, cuisine, and landmarks.",
                    "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ScnAS4Ux3qyBQl103o7zWy0j/user-nBd5rVlHBSuj6jZ8aUjGPDDZ/img-v33kRYLBJ7r7rRqc6uDoyBQA.png?st=2023-06-01T16%3A24%3A49Z&se=2023-06-01T18%3A24%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A30%3A35Z&ske=2023-06-01T20%3A30%3A35Z&sks=b&skv=2021-08-06&sig=U%2B9ZEjkH8Wr6NCE/46w1NSdPKu2TTNszgw83J6HPE4Q%3D",
                    "followups": ["what are the best restaurants in Paris?", "what are the best attractions in Paris?"],
                    "title": "Paris, France"
                }
            }, {
                "id": "comp-leq228ux",
                "match": {
                    "text1": "London is a vibrant city in England with a rich cultural heritage and lots of attractions to explore",
                    "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ScnAS4Ux3qyBQl103o7zWy0j/user-nBd5rVlHBSuj6jZ8aUjGPDDZ/img-rgGOFBMe5s6NNTVor9wQjAhj.png?st=2023-06-01T16%3A24%3A49Z&se=2023-06-01T18%3A24%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A32%3A11Z&ske=2023-06-01T20%3A32%3A11Z&sks=b&skv=2021-08-06&sig=ZOzHdebLHk2bFJetnILEtT5zkaP1zDABng26C3hjqwE%3D",
                    "followups": ["what are the best museums in London?", "what are the best bars in London?"],
                    "title": "London, England"
                }
            }, {
                "id": "comp-leqqmqit",
                "match": {
                    "text1": "Barcelona is a vibrant, cosmopolitan city in Spain and is considered one of the most popular cities to visit in Europe. It is filled with interesting museums, restaurants and other attractions",
                    "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ScnAS4Ux3qyBQl103o7zWy0j/user-nBd5rVlHBSuj6jZ8aUjGPDDZ/img-KtHERZG4afkvWDk27VtiJt9A.png?st=2023-06-01T16%3A24%3A49Z&se=2023-06-01T18%3A24%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-01T14%3A49%3A48Z&ske=2023-06-02T14%3A49%3A48Z&sks=b&skv=2021-08-06&sig=V3/g3oiwtdvETK7qYx0eP3AfHY8Kks45osK2mikygZQ%3D",
                    "followups": ["what attractions are in Barcelona?", "what are the best restaurants in Barcelona?"],
                    "title": "Barcelona, Spain"
                }
            }, {
                "id": "comp-leq228ux",
                "match": {
                    "text1": "Vienna is the cultural and political center of Austria, full of beautiful architecture, great food, and a rich history.",
                    "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ScnAS4Ux3qyBQl103o7zWy0j/user-nBd5rVlHBSuj6jZ8aUjGPDDZ/img-ezW7QAEGXG5k4mLLYeqz0VHx.png?st=2023-06-01T16%3A24%3A49Z&se=2023-06-01T18%3A24%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A03Z&ske=2023-06-01T20%3A31%3A03Z&sks=b&skv=2021-08-06&sig=g3n5I4dhRtwwulOU/A2SideIgPi4fbRGG0NE2qSqY%2B4%3D",
                    "followups": ["what is the best time of year to visit Vienna?", "what are the must-see attractions in Vienna?"],
                    "title": "Vienna, Austria"
                }
            }, {
                "id": "comp-leq228ux",
                "match": {
                    "text1": "Amsterdam is the capital of the Netherlands and is filled with culture, art galleries, and canals",
                    "image1": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ScnAS4Ux3qyBQl103o7zWy0j/user-nBd5rVlHBSuj6jZ8aUjGPDDZ/img-dtpiqZAxkPzGIEdiqA64AwjQ.png?st=2023-06-01T16%3A24%3A51Z&se=2023-06-01T18%3A24%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A33%3A15Z&ske=2023-06-01T20%3A33%3A15Z&sks=b&skv=2021-08-06&sig=y2UHVyIjFSnnshem5PgAd9hhqk9I%2Bw02DsWBbzIVO%2BQ%3D",
                    "followups": ["what are the best attractions in Amsterdam?", "what are the best cafes in Amsterdam?"],
                    "title": "Amsterdam, Netherlands"
                }
            }]
        }
    }
}

export default async function (req, res) {
    // return res.status(200).json(returnMockData())
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
        res.status(200).json({result})
    } catch (error) {
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
