const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { sequelize, chatuser } = require('./models')
const userController  = require('./controllers/userController.js')
const migrationhelper = require('./migrationhelper')
const session = require("express-session");
const { validateCreateUser, validateMessage } = require('./middlewares/validators/userValidators.js');
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
}));


app.get('/api/theloggedinuser', userController.onLoggedInUser)
app.get('/api/getallmessages', requireAuth , userController.getAllMessages)
app.get('/api/getallusers', userController.getAllUsers)
app.post('/api/sendmessage', validateMessage, userController.onSendMessage)

app.post('/api/useraccount', validateCreateUser, userController.onCreateUser)
app.post('/api/chatuser', validateCreateUser, userController.loginUserAccount)

app.listen(port, async () =>{
  await migrationhelper.migrate()
  await sequelize.authenticate()
  console.log(`Example app listening2 on port ${port}`)
})


