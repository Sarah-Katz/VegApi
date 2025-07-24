const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', recipeRoutes);

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Vegan Recipe API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
