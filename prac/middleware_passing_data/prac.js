// https://teamtreehouse.com/community/resrender-passing-in-object-vs-resrenderlocals-variables
// The properties added to the res.locals object persist through the entire request/response cycle meaning you could assign a value in a middleware function somewhere and then access it in another middleware function later or in PUG
const express = require('express');
const app = express();

app.set('view engine', 'pug');

//Route for 'example'
//Call the middleware function first, then go to my anonymous function
app.use('/example', middleware, (req, res, next)=>{
    console.log(res.locals.secret);
    return res.render('example', {
        prompt: "Hello World!"
    })
})

//Define a middleware function
function middleware(req, res ,next){
    res.locals.secret = 'SuperSecret';
    return next();
}

app.listen(3000, ()=>{
    console.log("listening on port 3000");
});