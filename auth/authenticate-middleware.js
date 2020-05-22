const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = ( req, res, next ) => {

  const token = req.headers.authorization;
  
  if(token){
    const secret = secrets.jwtSecret;

    jwt.verify(token, secret, (error, decodedToken) => {
      if(error){
        // the token is invalid or the secret is wrong if this happens.
        res.status(401).json({message: "You cannot pass!"})
      } else {
        // the token is good
        req.jwt = decodedToken;
        next()
      }
    })
  } else{
    res.status(400).json({message: "Please provide the authentication information"})
  }
};