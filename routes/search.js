const  asyncMiddleWare     = require('..//middleware/async');
const {Post,validate} = require('../models/post');
const {User} = require('../models/user');
const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();


router.post('/',asyncMiddleWare(async (req, res) => {
    const response =await Post.findAll({
        include: User,
        where: {
             [Op.or]: [
                {  firstName: {[Op.like]: Sequelize.literal('\'%'+req.body.value+'%\'')},},
                { lastName: {[Op.like]: Sequelize.literal('\'%'+req.body.value+'%\'')}},
                { hospitalName: {[Op.like]: Sequelize.literal('\'%'+req.body.value+'%\'')}},
                { cityName: {[Op.like]: Sequelize.literal('\'%'+req.body.value+'%\'')}},
                { bloodType: {[Op.like]: Sequelize.literal('\'%'+req.body.value+'%\'')}},
            ],
          }

    });


  res.status(200).send({
      status:'true',
      message:'get All Post Successfully..',
      data:response
  });
}));

module.exports = router;

