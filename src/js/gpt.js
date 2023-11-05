
function fetchDefGPT(keyword, sentence) {
    fetch(`http://18.218.226.79:3000/askDefGPT`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: "Please give me the definition of : " + keyword + ", In the following Context: " + sentence })
    })
    .then(response => response.json())
    .then(data => {
        console.log('DEFINITION Response:', data.answer);
    })
    .catch(error => {
        console.error('Error getting response from GPT:', error);
    });
}

function checkGPT(keyword, sentence, context) {
    fetch(`http://18.218.226.79:3000/checkGPT`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: "Does the usage of the word " + keyword + ", In the sentence: " + sentence  + "make sense given the context catigory of : " + context })
    })
    .then(response => response.json())
    .then(data => {
        console.log('CHECK Response:', data.answer);
    })
    .catch(error => {
        console.error('Error getting response from GPT:', error);
    });
}