
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const  asyncMiddleWare     = require('../../middleware/async');
const {Post_Archive} = require('../../models/Archive/post_archive');
const express = require('express');
const router = express.Router();


router.get('/',asyncMiddleWare(async (req, res) => {
console.log("-------------------------------------------------------------------");
    const damascus =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'دمشق'+'%\'')},}});
    const Dara =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'درعا'+'%\'')},}});
    const Aleppo =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'حلب'+'%\'')},}});
    const Kenitra =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'القنيطرة'+'%\'')},}});
    const Suwayda =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'السويداء'+'%\'')},}});
    const Homs =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'حمص'+'%\'')},}});
    const Hama =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'حماة'+'%\'')},}});
    const Idlib =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'ادلب'+'%\'')},}});
    const Alraka =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'الرقة'+'%\'')},}});
    const der_Alzoor =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'دير الزور'+'%\'')},}});
    const Latakia =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'الاذقية'+'%\'')},}});
    const Tartous =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'طرطوس'+'%\'')},}});
    const Al_hasakah =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'الحسكة'+'%\'')},}});
    const reaf_Dimashk =await Post_Archive.count({where:{cityName: {[Op.like]: Sequelize.literal('\'%'+'ريف دمشق'+'%\'')},}});



  res.status(200).send({
      status:'true',
      message:'get Donation  in Cites  Successfully..',
     damascus:damascus,
     damascusPeople:1827189,   
     Dara:Dara,
     DaraPeople:1508106,
     Aleppo:Aleppo,
     AleppoPeople:6918174,
     Kenitra:Kenitra,
     KenitraPeople:603988,
     Suwayda:Suwayda,
     SuwaydaPeople:575958,
     Homs:Homs,
     HomsPeople:2571654,
     Hama:Hama,
     HamaPeople:2623347,
     Idlib:Idlib,
     IdlibPeople:2420825,
     Alraka:Alraka,
     AlrakaPeople:1354474,
     der_Alzoor:der_Alzoor,
     der_AlzoorPeople:2137460,
     Latakia:Latakia,
     LatakiaPeople:1435781,
     Tartous:Tartous,
     TartousPeople:1115106,
     Al_hasakah:Al_hasakah,
     Al_hasakahPeople:2533806,
     reaf_Dimashk:reaf_Dimashk,
     reaf_DimashkPeople:2643407
  });
}));

module.exports = router;
