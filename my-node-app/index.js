// Import the Express.js framework
const express = require('express');
// Create an Express application instance
const app = express();

// Middleware to parse requests with content-type: application/json
app.use(express.json());

// Middleware to parse requests with content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Define a simple route for the root URL ("/")
app.get("/", (req, res) => {
    // Send a JSON response with a welcome message
    res.json({ message: "Welcome to NewProData web application." });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    // Determine the HTTP status code from the error object or use 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Log the error message and stack trace to the console
    console.error(err.message, err.stack);

    // Send a JSON response with the error message and the determined status code
    res.status(statusCode).json({ message: err.message });

    // Exit the middleware chain
    return;
});

// Set the port to either the environment variable PORT or 3000 if not defined
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
