const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //get Token From Req
  const token = req.header('x-auth-token');


  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
      
    //get Info User ((decode Secret_Env From Token))
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}