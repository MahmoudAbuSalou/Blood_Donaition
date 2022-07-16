const _ = require('lodash');
const auth = require('../../middleware/auth')
const asyncMiddleWare = require('../../middleware/async');
const {
    Post_Donate,
    validate_Post_donate
} = require('../../models/post_donate');
const {
    BloodDonors,
    validate
} = require('../../models/blood_donors');
const express = require('express');
const router = express.Router();

// This Route For Add Post By User
router.post('/:id', auth, asyncMiddleWare(async (req, res) => {


    // const sequelize = require('../../startup/db');
    // let transaction;
    // try {

        // get transaction
        // transaction = await sequelize.transaction();

        // get Donors 

             const response1 = await BloodDonors.findOne({where: { donate_id: req.params.id}});
             const response2 = await Post_Donate.create({ status:0,postPostId:response1.post_id,bloodDonorDonateId:response1.donate_id,user_id:response1.user_id});
            //  const response3 = await BloodDonors.destroy({ where: {donate_id:response1.donate_id}});


        // await transaction.commit();
        res.status(200).send({
            status: 'true',
            message: 'The Donor has been Successfully Removed..',
            data: null,
        
        });
    // } catch (error) {
    //     // Rollback transaction only if the transaction object is defined
    //     console.log(error);
    //     console.log("error add request")
    //     if (transaction) await transaction.rollback();
    // }

}));

module.exports = router;