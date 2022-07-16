const Sequelize = require('sequelize');
const {Post,validate} = require('../models/post');
const {User, validate1,genToken} = require('../models/user');
const {Post_Archive}=require('../models/Archive/post_archive')
const { UserProfile} = require('../models/health_user_profile');
//المتبرع له
const {User_Donate}=require('../models/Archive/donate_archive')
//المتبرع
const {User_Donor}=require('../models/Archive/blood_donors_archive')
module.exports= async function(idPost,idUser1,idUser2){

    // posts.forEach(element => {
    //     console.log(element.dataValues)
    // });
        
        let postAr= await Post_Archive.findOne({
       
            where: {
                   
              post_id:idPost}
          })
          if(postAr!=null){
            await Post_Archive.destroy({ where: { post_id:req.params.id,user_id:req.user.id}});
          }


         
          //AddPostToArchive
          let post= await Post.findOne({
       
            where: {
                   
              post_id:idPost}
          })
          let  postUp = new Post(_.pick(post, [ 'bloodBags', 'cityName','hospitalName','gender','postType','bloodType','bloodBagsCollect']));
             if(postUp.bloodBags==postUp.bloodBagsCollect  && idUser2!=null)
             {
              await Post.destroy({ where: { post_id:req.params.id,user_id:req.user.id}});
             }
          const response = await Post_Archive.create({
         
            
            post_id:postUp.post_id,
            user_id: postUp.user.id,
            bloodBags:postUp.bloodBags,
            bloodBagsCollect:postUp.bloodBagsCollect,
            cityName:postUp.cityName,
            hospitalName:postUp.hospitalName,
            gender:postUp.gender,
            postType:postUp.postType,
            bloodType:postUp.bloodType,
           
           
          });

          // المتبرع له
        let user1 = await User_Donate.findOne ({where:{user_id:idUser1}});
        if(user1 ==null){
        
    
         
          let userHealthProfile1 = await UserProfile.findOne ({where:{user_id:idUser1}});
          await User_Donate.create(
         {
          Donate_id:user1.user_id,
          birthDate:user1.birthDate,
          gender:userHealthProfile1.gender,
          address:user1.address
         } );

        }
      


        //المتبرع
        let user2 = await User.findOne ({where:{user_id:idUser2}});
        let userHealthProfile2 = await UserProfile.findOne ({where:{user_id:idUser2}});
        if(idUser2!=null){
          await User_Donor.create({
            Donate_id:user2.user_id,
            birthDate:user2.birthDate,
            gender:userHealthProfile2.gender,
            address:user2.address,
            post_id:idPost
          });
        }

}