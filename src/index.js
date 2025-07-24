const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

// Add a route for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Vegan Recipe API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
