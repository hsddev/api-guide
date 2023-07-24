// Dependencies
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({});
const routes = require("./routes");
const globalError = require("./middlewares/errorMiddleware");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(globalError);

app.listen(PORT, (req, res) => {
    console.log(`Start listening on port ${PORT}`);
});
