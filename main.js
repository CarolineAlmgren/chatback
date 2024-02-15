const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { sequelize, chatuser } = require('./models')
const userController  = require('./controllers/userController.js')
const migrationhelper = require('./migrationhelper')

app.use(cors({
  origin:"http://localhost:5500",
  credentials:true
}));

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



app.get('/api/messages/:userId',(req, res)=>{
  console.log(req.params.userId);
  let p = messages.find(message=>message.id == req.params.userId)
  if (p == undefined){
    res.status(404).send("finns inte")
  }
   res.json(result)
});

app.post('/api/useraccount', userController.onCreateUser)

app.listen(port, async () =>{
  await migrationhelper.migrate()
  await sequelize.authenticate()
  console.log(`Example app listening2 on port ${port}`)
})



app.get('/api/messages',(req, res)=>{
  let result = messages.map(p=>({
      id: p.id,
      message: p.message
  }))
   res.json(result)
});

app.listen(port, () => {
  console.log(`Example app listening2 on port ${port}`)
})

/*app.get("/api/messages", (req, res) => {
  res.json(messages);
})

app.get("/api/messages:message", (req, res) => {
  console.log(req.params.messageId);
  let message = messages.find(messages => messages.id == req.params.messageId);
  if (p == undefined){
    res.status(404).send("not found")
  }
  res.json(message)
})*/
