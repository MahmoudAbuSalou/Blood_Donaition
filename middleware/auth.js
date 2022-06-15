const jwt = require('jsonwebtoken');
const config = require('config');
const fs=require('fs')

function checkFile(filename) {
    fs.open(filename,'r',function(err, fd){
      if (err) {
        fs.writeFile(filename, '', function(err) {
            if(err) {
                console.log(err);
            }
            console.log("The file was saved!");
        });
      } else {
        console.log("The file exists!");
      }
    });
  }
module.exports = async (req, res, next) => {

   
    let token = req.headers.authorization;
   
 
    if (token) {
        try {
      
            /* ---------------------- Check For Blacklisted Tokens ----------------------*/
            var isBlackListed=false;
       
       checkFile('./BlackList.txt')
           fs.readFile('./BlackList.txt', function (err, data) {
            if (err) {
                console.log('blackList')
                throw err;
            }
            if(data.includes(token)){
             isBlackListed=true;
            }
          });
          
        
       
           
                 if (isBlackListed) {
                  return res.status(401).json({ error: 'Unauthorized' });
             }
            


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