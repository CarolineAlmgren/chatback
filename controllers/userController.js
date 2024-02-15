async function onCreateUser(req,res){

    const {username} = req.body

    // let hashedPassword = "hasha" (password)
    //let hashedPassword = await bcrypt.hash(password,10)

    await UserAccount.create({
        username,
        // email,
        // password: hashedPassword
    })
    //Cookien och vem är inloggad?  ->  req
    res.status(204).json({ username })
}