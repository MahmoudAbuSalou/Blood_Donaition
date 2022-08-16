const {User_Donate}=require('../../models/Archive/donate_archive')
const {User_Donor}=require('../../models/Archive/blood_donors_archive')
const  asyncMiddleWare     = require('../../middleware/async');
const auth=require('../../middleware/auth')
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
function parseDate(str) {
    var mdy = str.split('-');
    
    var date=(mdy[0]*365)+(mdy[1]*30)+(mdy[2]*1);
    return date;
}

function myFunction(birthDate) {
    birthDate=parseDate(birthDate)
    const date = new Date();

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // getUTCMonth() returns month from 0 to 11
    const year = date.getUTCFullYear();
    
    const str = `${year}-${month}-${day}`;
    
var now=parseDate(str);

    var AgeTemp=birthDate-now;
    var difference= Math.abs(AgeTemp);
    
    var Age=difference/365;
    
    if(Age>18 && Age <60){
       
    return true
    }
   
    return false
  
  }
//المتبرع له
router.get('/Donate',asyncMiddleWare(async(req,res)=>{

 
    let user = await User_Donate.findAll ();
    var elderly=0;
    var youths=0;
    user.forEach(element => {
        if(!myFunction(element.birthDate)){
            elderly++;
        }
        else
        youths++;

    });
  
   
  
     
   
  

    if(user.length!=0){
      var data={
        "status":"true",
        "youths":(youths/user.length)*100,
        "elderly":(elderly/user.length)*100
      }
      res.status(200).send(data)
    }
      else{
        var data={
          "status":"true",
          "youths":0,
          "elderly":0
        }
        res.status(200).send(data)
      }
  
  
  
  }));

  //المتبرع
  router.get('/Donor',asyncMiddleWare(async(req,res)=>{

 
    
    let user = await User_Donor.findAll ();
    var elderly=0;
    var youths=0;
    user.forEach(element => {
        if(!myFunction(element.birthDate)){
            elderly++;
        }
        else
        youths++;

    });
  
   
  
     
   
  
    if(user.length!=0){
    var data={
      "status":"true",
      "youths":(youths/user.length)*100,
      "elderly":(elderly/user.length)*100
    }
    res.status(200).send(data)
  }
    else{
      var data={
        "status":"true",
        "youths":0,
        "elderly":0
      }
      res.status(200).send(data)
    }
   
  
   
  
  
  
  
  
  
  }));
  module.exports = router; 