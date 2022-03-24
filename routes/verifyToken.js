const jwt = require('jsonwebtoken')

//Middleware Checks the token
const auth = (req,res,next) => {
    const token = req.cookies.authtoken
    if(!token) return res.status(401).send('access denied')

    jwt.verify(token,process.env.privateKey,(err,decoded) =>{
        if(err) return res.status(400).send('Invalid token')
        req.user = decoded
        next()
    })
}

module.exports= auth;