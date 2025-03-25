import express from "express";
const app = express();

// Use express.json() middleware to parse incoming JSON data
app.use(express.json());

app.post('/api/test', (req, res) => {
  // Access the request body
  const { username, password } = req.body;
  console.log('Received data:', req.body);

  // Send a response
  res.json({
    message: 'Data received',
    data: { username, password }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
