const express = require('express')
const router = express.Router()

let ImageModel = require('../models/Image.model')

// NOTE: All your API routes will start from /api 

// will handle all GET requests to http:localhost:5005/api/album
router.get('/album', (req, res) => {
     ImageModel.find()
          .then((album) => {
               console.log(album)
               res.status(200).json(album)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

// will handle all POST requests to http:localhost:5005/api/create
router.post('/create', (req, res) => {  
    const {title, genre, description, image, price} = req.body;
    console.log(req.body)
    ImageModel.create({title: title, genre: genre, description: description, imageUrl: image, price: price})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong creating',
                    message: err
               })
          })  
})


// will handle all GET requests to http:localhost:5005/api/album/:imageId
//PS: Don't type :imageId , it's something dynamic, 
router.get('/album/:imageId', (req, res) => {
       ImageModel.findById(req.params.imageId)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})


// will handle all DELETE requests to http:localhost:5005/api/todos/:id
router.delete('/album/:id', (req, res) => {
     ImageModel.findByIdAndDelete(req.params.id)
           .then((response) => {
                res.status(200).json(response)
           })
           .catch((err) => {
                res.status(500).json({
                     error: 'Something went wrong',
                     message: err
                })
           })  
 })
 

// will handle all PATCH requests to http:localhost:5005/api/album/:id
router.patch('/album/:imageId', (req, res) => {
    let imageId = req.params.imageId
    const {title, genre, description, price} = req.body;
    ImageModel.findByIdAndUpdate(imageId, {$set: {title: title, gere: genre, description: description, price: price}}, {new: true})
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

module.exports = router;