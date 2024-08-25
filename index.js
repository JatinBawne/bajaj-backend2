const express = require('express');
const app = express();
var cors=require('cors')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: '*', // Allow only your frontend domain
    methods: ['GET', 'POST'], // Allow only GET and POST requests
  }));
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Initialize arrays
    const numbers = [];
    const alphabets = [];
    const lowercaseAlphabets = [];

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (isNaN(item) && typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && item >= 'a' && item <= 'z') {
                lowercaseAlphabets.push(item);
            }
        }
    });

    // Find the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [lowercaseAlphabets.sort().pop()] 
        : [];

    // Construct the response
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    // Send the response
    res.json(response);
});

app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };
    res.status(200).json(response);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});