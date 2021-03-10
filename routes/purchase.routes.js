const express = require('express')
const router = express.Router()

let PurchaseModel = require('../models/Purchase.model')
let UserModel = require('../models/User.model')

// NOTE: All your API routes will start from /api 

router.get('/purchase', (req, res) => {
  // req.session.LoggedInUser._id is the unique id of the user
  PurchaseModel.find({buyer_id: req.session.loggedInUser._id})
    .populate("image_id")
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             console.log(err)
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        }) 
})

// will handle all POST requests to http:localhost:5005/api/purchase
router.post('/purchase', (req, res) => {  
    const {image_id, totalprice, date} = req.body;
    // buyer_id you get it from req.session
    // req.session.loggedInUser = UserData
    let buyer_id = req.session.loggedInUser._id
    console.log(req.body)
    PurchaseModel.create({image_id: image_id, totalprice: totalprice, date: date, buyer_id: buyer_id})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong creating purchase',
                    message: err
               })
          })  
})
module.exports = router;