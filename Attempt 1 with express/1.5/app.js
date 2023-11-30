// Import the Express framework and other necessary modules.
import express from "express"; // Import the Express framework.
import bodyParser from 'body-parser'; // Import the body-parser middleware.
import textModify from "./controllers/script.js"; // Import a custom controller function for text modification.
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory using import.meta.url
const currentDir = dirname(fileURLToPath(import.meta.url));

// Create an instance of the Express application.
const app = express();

// Serve static files fryom the "public" directory.
app.use(express.static("public"));

// Parse JSON data in HTTP requests using bodyParser middleware.
app.use(bodyParser.json());

// Define a route for the root URL ("/").
app.get("/", (req, res) => {
  // Serve the "indexWorking.html" file from the "public" directory.
  res.sendFile(currentDir + "/index.html");
});

// Define a route for handling POST requests to "/test".
app.post("/test", (req, res) => {
  try {
    // Extract the 'tmp_sent' and 'tmp_sent_cpy' properties from the request's JSON body.
    const tmp_sent = req.body.tmp_sent;
    const tmp_sent_cpy = req.body.tmp_sent_cpy;

    // Call the 'textModify' function with the extracted data.
    const correct_sent = textModify(tmp_sent, tmp_sent_cpy);

    // Send the modified text as a JSON response.
    res.json(correct_sent);
  } catch (e) {
    // If an error occurs during processing, log the error and send a 500 Internal Server Error response.
    console.log(e);
    res.status(500).json(e.message);
  }
});

// Define the port on which the server will listen.
const port = 3000;

// Start the Express server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
