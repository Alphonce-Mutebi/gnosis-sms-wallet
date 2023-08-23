import express from 'express';
import { json, urlencoded } from 'body-parser'
const ussdRoute = require("./index");
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running on localhost:${PORT}`));

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/", ussdRoute);