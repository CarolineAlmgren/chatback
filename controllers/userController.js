//const chatuser = require("../models/chatuser")
const { sequelize, chatUser, message } = require('../models')
const bcrypt = require('bcrypt')

async function onHej(req,res){
    // Cookien och vem är inloggad ???  ->  req

    // Ta den inloggade och hämta från DB
    //
    const id = req.session.userId
    const user = await chatUser.findOne({
        where: {id}
    });
    
    res.json(user)
}

async function onCreateUser(req,res){

    const {Username,password} = req.body

    const user = await chatUser.findOne({
        where: {Username}
    });
    if (user) {
        return res.status(401).json('Username already exist');
    }
    else {
    // let hashedPassword = "hasha" (password)
    let hashedPassword = await bcrypt.hash(password,10)

    await chatUser.create({
        Username,
        // email,
        password: hashedPassword
    })
    //Cookien och vem är inloggad?  ->  req
    res.status(204).json({ Username,password })
}
}

async function loginUserAccount (req,res){

    const {Username,password} = req.body

    const user = await chatUser.findOne({
        where: {Username}
    });
    if (!user) {
        return res.status(401).json('Could not login');
    }
    
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json('Login failed');
    }    

    req.session.userId = user.id

    res.json({status:"Yepp"})
}


async function onSendMessage(req,res){

    const {message,chatUserId} = req.body

    await message.create({
        message,
        chatUserId
    })

    //res.status(204).json({ Username,password })
}

module.exports = {
    onHej,
    onCreateUser,
    loginUserAccount,
    onSendMessage
}