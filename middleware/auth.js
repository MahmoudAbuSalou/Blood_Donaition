const jwt = require('jsonwebtoken');
const config = require('config');
const {TokenModel ,encodeToken}=require('../models/blackList')


module.exports = async (req, res, next) => {

   
    let token = req.headers.authorization;
   
 
    if (token) {
        try {
      
            /* ---------------------- Check For Blacklisted Tokens ----------------------*/
         
             
             let tempToken = await TokenModel.findAll();
           
             tempToken.forEach( element => {
              var temp1=element.token;
              
              var temp2 =  jwt.verify(temp1, config.get('blackListKey'));
              
               
              if(temp2.crypt==token)
              return res.status(401).json({ error: 'UnauthorizedBlackList' });
              
             });
              
  
          
        
       
            
            


             /*----------------    Decode Token      --------------*/
           const decoded =  jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
          
          
          
            next();

        } catch (error) { 
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        return res.status(400).json({ error: 'Authorization header is missing.' })
    }
}