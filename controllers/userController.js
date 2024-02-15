const chatuser = require("../models/chatuser")

async function onCreateUser(req,res){

    const {username} = req.body

    // let hashedPassword = "hasha" (password)
    //let hashedPassword = await bcrypt.hash(password,10)

    await chatuser.create({
        username,
        // email,
        // password: hashedPassword
    })
    //Cookien och vem är inloggad?  ->  req
    res.status(204).json({ username })
}


module.exports = {
    onCreateUser
}