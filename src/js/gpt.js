function fetchGPT(prompt) {
    fetch(`${CONFIG.API_ENDPOINT}/askGPT`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: "I am now going to pass in metadata associated with a youtube video. I do not need any information back on this please respond 'ok got it' to this query" + prompt })
    })
    .then(response => response.json())
    .then(data => {
        console.log('GPT Response:', data.answer);
    })
    .catch(error => {
        console.error('Error getting response from GPT:', error);
    });
}