
const { sequelize, chatUser, message } = require('../models')

const bcrypt = require('bcrypt')

async function onLoggedInUser(req,res){
  
    const id = req.session.userId
    const user = await chatUser.findOne({
        where: {id}
    });
    
    res.json(user)
}

async function getAllMessages(req,res){

    const allMessages = await message.findAll({
    });


    
    res.json(allMessages)
}

async function getAllUsers(req,res){
    const allUsers = await chatUser.findAll({
    });
    
    res.json(allUsers)
}



async function onCreateUser(req,res){
    const {Username,password} = req.body

    const user = await chatUser.findOne({
        where: {Username}
    });
    if (user) {
        return res.status(401).json({errors:[{msg:'Username already exist'}]});
    }
    else {
    let hashedPassword = await bcrypt.hash(password,10)

    await chatUser.create({
        Username,
        password: hashedPassword
    })
    res.status(204).json({ Username,password })
}
}

async function loginUserAccount (req,res){
    const {Username,password} = req.body

    const user = await chatUser.findOne({
        where: {Username}
    });
    if (!user) {
        return res.status(401).json({errors:[{msg:'Could not login'}]});
    }
    
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({errors:[{msg:'Could not login'}]});
    }    

    req.session.userId = user.id
    res.json({status:"Yepp"})
}


async function onSendMessage(req,res){
    
    await message.create({message: req.body.message, chatUserId: req.body.chatUserId })
    

    res.status(201).send('Created')
}



module.exports = {
    onLoggedInUser,
    onCreateUser,
    loginUserAccount,
    onSendMessage,
    getAllMessages,
    getAllUsers
}