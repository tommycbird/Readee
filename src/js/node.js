const express = require('express');
const cors = require('cors');
const OpenAIApi = require('openai');
const app = express();
const port = 3000;
const path = require('path');

//API Key for OpenAI
process.env.OPENAI_API_KEY = 'aaaaaa';
const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });

// Serve static files from the 'Readee' directory
app.use(express.static(path.join(__dirname, '../../')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors());

//======================================================================================================================================================

//Method to query the openAI API for word Definitions
app.post('/askDefGPT', async (req, res) => {
    try {
        console.log("Received request for /askDefGPT:", req.body);
        const userMessage = req.body.prompt;
        
        // Initialize the instance with predefined information
        const messages = [
            {
                role: "system",
                content: "You are going to be helping give short, yet in depth definitions of words given the context that they are used in."
            },
            {
                role: "user",
                content: "The definition you give should not be too verbose or use complicated vocabulary so it is easy to understand. The response should be kept below 20 words or roughly two sentences. The definition (respsonse) should also not explicitly refer to the sentence it was used in "
            },
            {
                role: "user",
                content: "Please give me the definition of the word 'program' in the sentence 'The computer program succesfully executed and displayed the correct answer' "
            },
            {
                role: "assistant",
                content: "A program is a set of instructions that a computer follows to perform specific tasks. These instructions are usually written in a programming language that the computer can interpret and execute."
            },
            {
                role: "user",
                content: userMessage
            }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: messages
        });
        
        console.log("OpenAI API Response:", response); 
        const answer = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
        
        if (answer) {
            console.log("Answer received");
            res.json({ answer: answer }); 
        } else {
            res.json({ error: "Failed to get an answer from GPT." });
        }
        
    } catch (error) {
        console.error("Error while processing /askDefGPT:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//======================================================================================================================================================

//Method to query the openAI API for word Definitions
app.post('/checkGPT', async (req, res) => {
    try {
        console.log("Received request for /checkGPT:", req.body);
        const userMessage = req.body.prompt;
        
        // Initialize the instance with predefined information
        const messages = [
            {
                role: "system",
                content: "You are going to be a helpful assistant that validates another part of a broader program"
            },
            {
                role: "user",
                content: "Your job is to respond 'True' if the word in the given sentence makes sense given the context catigory that is provided. The model should return 'false' otherwise. This will determine if the correct usage of a word is used in a given context"
            },
            {
                role: "user",
                content: "Does the word 'bug' in the sentence 'The bug in the code caused the server to crash' make sense with the context catigory of 'insect' "
            },
            {
                role: "assistant",
                content: "False"
            },
            {
                role: "user",
                content: "Does the word 'virus' in the sentence 'Tommy caught the virus and is not feeling well' make sense with the context catigory of 'disease'? "
            },
            {
                role: "assistant",
                content: "True"
            },
            {
                role: "user",
                content: userMessage
            }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: messages
        });
        
        console.log("OpenAI API Response:", response); 
        const answer = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
        
        if (answer) {
            console.log("Answer received");
            res.json({ answer: answer }); 
        } else {
            res.json({ error: "Failed to get an answer from GPT." });
        }
        
    } catch (error) {
        console.error("Error while processing /askDefGPT:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//======================================================================================================================================================

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});