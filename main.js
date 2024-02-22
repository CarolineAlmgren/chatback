const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { sequelize, chatuser } = require('./models')
const userController  = require('./controllers/userController.js')
const migrationhelper = require('./migrationhelper')
const session = require("express-session");
const { validateCreateUser } = require('./middlewares/validators/userValidators.js');
const {requireAuth} = require('./middlewares/requireAuth.js')

app.use(express.json())
app.use(cors({
  origin:"http://localhost:5500", 
  credentials:true
}));


app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } HTTPS
}));


app.get('/api/messages/:userId',(req, res)=>{
  console.log(req.params.userId);
  let p = messages.find(message=>message.id == req.params.userId)
  if (p == undefined){
    res.status(404).send("finns inte")
  }
   res.json(result)
});

app.get('/hej', userController.onHej)
app.post('/api/sendmessage', userController.onSendMessage)

app.post('/api/useraccount', validateCreateUser, userController.onCreateUser)
app.post('/api/chatuser', userController.loginUserAccount)

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

// app.listen(port, () => {
//   console.log(`Example app listening2 on port ${port}`)
// })

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
