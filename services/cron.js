

  const  asyncMiddleWare     = require('../middleware/async');
  const {Post,validate} = require('../models/post');
  const User=require('../models/user')
  const {Post_Archive}=require('../models/Archive/post_archive');
  const {User_Donor}=require('../models/Archive/blood_donors_archive');
  const {User_Donate}=require('../models/Archive/donate_archive');
  const addPostToArchive=require('./addPostToArchive')
  const {BloodDonors}=require('../models/blood_donors')
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


  // '0 */12 * * *'
 module.exports= function(){
     
    cron.schedule('0 */12 * * *', asyncMiddleWare(async () => {
      


      //FetchPosts
     let post= await Post.findAll({
      include:BloodDonors  ,
        where: {
               
          expiryDate: {[Op.lt]: formatDate(new Date())},}
      })

     
    post.forEach(element => {
    
     addPostToArchive(element.post_id,element.user_id,null)
    });
   
     
      
         console.log('Cron is Running Successfully')
 
  
})
  );
 
}
  


  
  