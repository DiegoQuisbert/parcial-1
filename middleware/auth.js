const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

require('dotenv').config();

const secretKey = process.env.SECRETKEY

const valToken = ( req, res, next ) => {
    const auth = req.headers.authorization;

    if(!auth) {
        res.status(401).json({msg: 'falta el token'});
        return;
    }

    token = auth.split(' ')[1];

    console.log({token});

    jwt.verify(token, secretKey, ( error, decoded ) => {
        if(error) {
            return res.status(403).json({msg: 'token inválido'});
        }
        req.body.userId = decoded.userId;

        next();
    })

}

module.exports = valToken;