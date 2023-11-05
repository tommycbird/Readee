
async function fetchDefGPT(keyword, sentence) {
    try {
        const response = await fetch(`https://teleportationhub.com/askDefGPT`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: "Please give me the definition of : " + keyword + ", In the following Context: " + sentence })
        });
        const data = await response.json();
        console.log('Received data:', data); // Log the entire data to inspect
        if (data && data.answer) {
            console.log('DEFINITION Response:', data.answer);
            return data.answer;
        } else {
            console.log('No definition found in the response');
            return null; // or a default value or throw an error
        }
    } catch (error) {
        console.error('Error getting response from GPT:', error);
        return null; // or a default value or throw an error
    }
}


function checkGPT(keyword, sentence, context) {
    fetch(`https://18.218.226.79:3000/checkGPT`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: "Does the usage of the word " + keyword + ", In the sentence: " + sentence  + "make sense given the context catigory of : " + context })
    })
    .then(response => response.json())
    .then(data => {
        console.log('CHECK Response:', data.answer);
        return data.answer;
    })
    .catch(error => {
        console.error('Error getting response from GPT:', error);
    });
}