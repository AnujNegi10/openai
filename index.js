// Import required modules
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import  cors  from 'cors';
dotenv.config({
  path: ".env",
});
const api = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: api,
});

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON bodies in POST requests
app.use(express.json());

// Set up a port for the server to listen on
const port = 5001;
app.use(cors())
// Define a POST route
app.post("/info", async (req, res) => {
  // Extract data from the request body

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "create a timeline for this news " + req.body.message +"in as brief as possible in sentences  "
      },
    ],
  });

  res.json({
    message: completion.choices[0].message,
  });
});

app.post("/translate", async (req, res) => {
  // Extract data from the request body

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "translate this message to english " + req.body.message + "if only in english then return the same sentence ",
      },
    ],
  });

  res.json({
    message: completion.choices[0].message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(Server is running on http://localhost:${port});
});
