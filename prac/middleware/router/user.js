const express = require('express');
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
    console.log('This is a middleware executed every time');
    // console.log('Time:', Date.now());
    next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  
    console.log("This is middleware executed for every /user call regardless of type of HTTP request");
    console.log('Request URL:', req.originalUrl, req.params.id);
    next();
}, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
    console.log("This is middleware executed for get /user call");
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route');
    // otherwise pass control to the next middleware function in this stack
    else next()
}, (req, res, next) => {
    console.log("This is middleware executed for get /user call with id != 0 ");
    // render a regular page
    //   res.render('regular')
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
    console.log("This is middleware executed for get /user call with id = 0 ");
    console.log(req.params.id);
    //   res.render('special')
});

module.exports= router;