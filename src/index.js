const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');
const generalRoutes = require('./routes/generalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', generalRoutes, recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
