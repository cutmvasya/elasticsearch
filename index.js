const express = require('express');
const app = express();
const routes = require('./routes')

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes); 

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});