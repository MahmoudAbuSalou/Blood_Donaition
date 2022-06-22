const nodemailer = require("nodemailer");





module.exports=async function (email,pin) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
       
        auth: {
          user: 'bdonation074@gmail.com',
          pass: 'myzdyorkwpbyshbk'
          //heroko myzdyorkwpbyshbk123456789*
          //https://blood-donation-mah.herokuapp.com/
          //https://git.heroku.com/blood-donation-mah.git
        }
      });
     
      var mailOptions = {
        from: 'bdonation074@gmail.com',
        to:email ,
        subject: 'Verification Your Email',
        text: pin
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
         
        
        }
      });
}