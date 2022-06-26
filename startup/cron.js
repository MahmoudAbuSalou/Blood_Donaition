  /*

  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )


  */

  const  asyncMiddleWare     = require('..//middleware/async');
  const {Post,validate} = require('../models/post');
  const User=require('../models/user')
 
  
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  
  const cron = require('node-cron');

  //To Edit Fromat Of Date
function dateComponentPad(value) {
    var format = String(value);
  
    return format.length < 2 ? '0' + format : format;
  }
  
  function formatDate(date) {
    var datePart = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].map(dateComponentPad);
    var timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(dateComponentPad);
  
    return datePart.join('-') + ' ' + timePart.join(':');
  }


  
 module.exports= function(){
     
    cron.schedule('0 */12 * * *', asyncMiddleWare(async () => {
      
        await Post.destroy({
         
          where: {
               
            expiryDate: {[Op.lt]: formatDate(new Date())},}
               
              
            
  
            
      });
   
      
         console.log('Cron is Running Successfully')
 
  
})
  );
 
}
  


  
  