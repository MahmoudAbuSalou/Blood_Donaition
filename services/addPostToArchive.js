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
  console.log("ppppppppppppppppppppppppppppppppppppppppppppppppp");
    console.log(idPost)
    console.log(idUser1)
    console.log(idUser2)
    console.log("ppppppppppppppppppppppppppppppppppppppppppppppppp");
    // posts.forEach(element => {
    //     console.log(element.dataValues)
    // });
        
        let postAr= await Post_Archive.findOne({
       
            where: {
                   
              post_id:idPost}
          })
          if(postAr!=null){
            await Post_Archive.destroy({ where: { post_id:idPost}});
          }


         
          //AddPostToArchive
         const post= await Post.findOne({ where: { post_id:idPost} });
        
          
      //    let  postUp = new Post(_.pick(post, [ 'bloodBags', 'cityName','hospitalName','gender','postType','bloodType','bloodBagsCollect']));
      var state=false;   
      if(parseInt(post.bloodBags)===post.bloodBagsCollect && idUser2!=null)   
    
             {
              await Post.destroy({ where: { post_id:idPost}});
              state=true;
             }
          const response = await Post_Archive.create({
         
            
            post_id:post.post_id,
            user_id: post.user_id,
            bloodBags:post.bloodBags,
            bloodBagsCollect:post.bloodBagsCollect,
            cityName:post.cityName,
            hospitalName:post.hospitalName,
            gender:post.gender,
            postType:post.postType,
            bloodType:post.bloodType,
           
            state:state
           
          });





          // المتبرع له
        let user1 = await User_Donate.findOne ({where:{Donate_id:idUser1}});
        console.log('-----------------------------------------------------------------------------------')
        
        if(user1 ==null){
        
       const   user11 = await User.findOne ({where:{user_id:idUser1}});
          console.log(user11)
          const userHealthProfile1 = await UserProfile.findOne ({where:{user_id:idUser1}});
          await User_Donate.create(
         {
          Donate_id:user11.user_id,
          birthDate:user11.birthDate,
          gender:userHealthProfile1.gender,
          address:user11.address
         } );

        }
      


        //المتبرع
      
        if(idUser2!=null){
          console.log("--------------1----------")
          console.log(idUser2);
          let user2 = await User.findOne ({where:{user_id:idUser2}});
          console.log('--------------2---------------------------------------------------------------------')
          console.log(user2)
          console.log('--------------3---------------------------------------------------------------------')
          let userHealthProfile2 = await UserProfile.findOne ({where:{user_id:idUser2}});
          await User_Donor.create({
            Donor_id:user2.user_id,
            birthDate:user2.birthDate,
            gender:userHealthProfile2.gender,
            address:user2.address,
            post_id:idPost
          });
        }

          //DeletePosts
        if(idUser2==null){
            //DeletePosts
       await Post.destroy({
         
        where: {
             
          post_id:idPost}
             
            
          

          
    });
        }

}