// [Use-case] Our Goal: build a AI Text Generation application 

// DOM Elements
const formEl = document.querySelector('form');
const promptEl = document.querySelector('#prompt')
const submitEl = document.querySelector('#sub-btn')
const textEl = document.querySelector('#text')
const refreshEl = document.querySelector('#refresh'); // New button for refreshing

formEl.addEventListener('submit', event => {
  event.preventDefault();

  // Retrieve user input from the prompt input field
  const userInput = promptEl.value.trim();

  // Call the function to make a fetch request to OpenAI API
  fetchText(userInput);
});

// Function to make fetch request to OpenAI API
function fetchText(userInput) {
// Define OPENAI SK with SK
// When it is called it doesn't need to be shown again in the object
  const OPENAI_API_KEY = window.env.OPENAI_API_KEY;
// Define a variable that has all necessary information 
// It includes the fetch: method, headers, and body.json.stringfy
// It includes the inputs of the AI Inputs: Model, Messages, Role, and Content

// Set up options for the fetch request
const requestOptions = { // Set up options for the fetch request
  method: 'POST', // Use POST method for sending data to API Backend
  headers: {
    'Content-Type': 'application/json', // Specify content type as JSON
    'Authorization': `Bearer ${OPENAI_API_KEY}` // Include API key in Authorization header
  },
  body: JSON.stringify({ // Convert payload to JSON string
    model: 'gpt-3.5-turbo', //API Model Type
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  })
};

fetch('https://api.openai.com/v1/chat/completions', requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    // If successful, parse response body as JSON and return it
  })
  .then(data => {
  // Handle the response data
    const generatedText = data.choices[0].message.content.trim();
    textEl.textContent = generatedText; // Display generated text on the page
    console.log('Response:', data);
    // You would typically process the response data here
  })
  .catch(error => {
  console.error('Error:', error);
  });
}

// // Event listener for refresh button
// refreshEl.addEventListener('click', () => {
//   location.reload(); // Refresh the page
// });

// Add Loading Gif
//

//Request to the browser

//Error checker to see if there is an error with the network