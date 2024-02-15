//const chatuser = require("../models/chatuser")
const { sequelize, chatUser } = require('../models')

async function onCreateUser(req,res){

    const {Username} = req.body

    // let hashedPassword = "hasha" (password)
    //let hashedPassword = await bcrypt.hash(password,10)

    await chatUser.create({
        Username,
        // email,
        // password: hashedPassword
    })
    //Cookien och vem är inloggad?  ->  req
    res.status(204).json({ Username })
}

async function loginUserAccount (req,res){

    const {Username} = req.body

    const user = await chatUser.findOne({
        where: {Username}
    });
    if (!user) {
        return res.status(401).json('Could not login');
    }

    res.json({status:"Yepp"})
}



module.exports = {
    onCreateUser,
    loginUserAccount
}