module.exports = (req, res, next) => {
    console.log("middleware invoked");
    if(req.session.isLoggedIn)
    {
        console.log('you are okay to proceed');
        next();
    }
    else{
        console.log('you should do login')
        return res.redirect('/login');
    }

}