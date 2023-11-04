const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAIApi = require('openai');
const app = express();
const port = 3000;
const path = require('path');



//API Key for OpenAI
process.env.OPENAI_API_KEY = 'birdballs';
const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});