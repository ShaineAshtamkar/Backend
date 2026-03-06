const express = require("express");
const morgan = require("morgan");

const app = express();

// Body parser
app.use(express.json());
