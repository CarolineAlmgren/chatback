const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const messages = [
  {
    message: "What are you people doing?",
    id: 1,
  },
  {
    message: " Hey, feeling calm today. Time travel anyone?",
    id: 2,
  },
  {
    message: "who else is online?",
    id: 3,
  },
  {
    message:
      "Im also online. And if you wonder, yes, the original - Steve Rodgers",
    id: 4,
  },
  {
    message: "Im also online. How are you people?",
    id: 5,
  },
  {
    message: "I am fine.",
    id: 6,
  },
  {
    message: "We are doing fine. I am in.",
    id: 8,
  },
];
