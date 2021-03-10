const express = require('express')
const router = express.Router()

//we installed bcrypt.js
const bcrypt = require('bcryptjs');

const UserModel = require('../models/User.model');
const ImageModel = require('../models/Image.model')


router.post('/signup', (req, res) => {
  const {username, email, password } = req.body;
  console.log(username, email, password);

  // -----SERVER SIDE VALIDATION ----------
    
  if (!username || !email || !password) {
    res.status(500)
      .json({
        errorMessage: 'Please enter username, email and password'
      });
    return;  
}
// Decrypting password (creating a salt) 
 let salt = bcrypt.genSaltSync(10);
 let hash = bcrypt.hashSync(password, salt);
 UserModel.create({name: username, email, passwordHash: hash})
   .then((user) => {
     // ensuring that we don't share the hash as well with the user
     user.passwordHash = "***";
     res.status(200).json(user);
   })
   .catch((err) => {
     if (err.code === 11000) {
       res.status(500).json({
         errorMessage: 'username or email entered already exists!',
         message: err,
       });
     } 
     else {
       res.status(500).json({
         errorMessage: 'Something went wrong!',
         message: err,
       });
     }
   })
});

// POST requests to http:localhost:5005/api/login
router.post('/login', (req, res) => {
  const {email, password } = req.body;

   // -----SERVER SIDE VALIDATION ----------
  
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please enter Username. email and password',
       })
      return;  
    }
 
// POST requests to http:localhost:5005/api/logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  // Nothing to send back to the user
  res.status(204).json({});
})


UserModel.findOne({email})
    .then((userData) => {
           //check if passwords match
          bcrypt.compare(password, userData.passwordHash)
            .then((doesItMatch) => {
                //if it matches
                if (doesItMatch) {
                  // req.session is the special object that is available to you
                  userData.passwordHash = "***";
                  req.session.loggedInUser = userData;
                  res.status(200).json(userData)
                }
                //if passwords do not match
                else {
                    res.status(500).json({
                        error: 'Passwords don\'t match',
                    })
                  return; 
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: 'Email format not correct',
                })
              return; 
            });
      })
      //throw an error if the user does not exists 
       .catch((err) => {
        res.status(500).json({
            error: 'Email does not exist',
            message: err
        })
        return;  
      });
    });
      
// will handle all POST requests to http:localhost:5005/api/logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  // Nothing to send back to the user
  res.status(204).json({});
})


// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {  
if (req.session.loggedInUser) {
    //calls whatever is to be executed after the isLoggedIn function is over
    next()
}
else {
    res.status(401).json({
        message: 'Unauthorized user',
        code: 401,
    })
};
};

// // middleware to check if user is Admin
// const is_admin = (req, res, next) => {  
//   if (req.session.is_admin) {
//       //calls whatever is to be executed after the isLoggedIn function is over
//       next()
//   }
//   else {
//       res.status(402).json({
//           message: 'User is not Admin',
//           code: 402,
//       })
//   };
//   };




// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/user", isLoggedIn, (req, res, next) => {
res.status(200).json(req.session.loggedInUser);
});


    module.exports = router;