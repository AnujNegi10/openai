// Import required modules
import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config({
    path: ".env"
})
const api = process.env.OPENAI_API_KEY 

const openai = new OpenAI({
    apiKey : api
});

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON bodies in POST requests
app.use(express.json());

// Set up a port for the server to listen on
const port = 3000;

// Define a POST route
app.post('/info',async (req, res) => {
    // Extract data from the request body
    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {"role": "user", 
            "content": "summarixze this"+req.body.message +"under 50 words"
        }
        ]
    });

    res.json({
        message : completion.choices[0].message
    })
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
