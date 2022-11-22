const path = require('path');

const express = require('express');
// body parser is deprecated?
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const User = require('./models/user');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
// const Session = require('./models/session');

const MONGODB_URI = 'mongodb://localhost:27017/shop3?retryWrites=true'
const app = express();
const store = new MongoDBStore({
  uri : MONGODB_URI ,
  collection: 'sessions'
})
const csrfProtection = csurf({});
// console.log("store : ", store);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);
// should define csurf package after session, since csrf utilize the session
app.use(csrfProtection); 
app.use(flash());
// app.use(cookieParser());
// When every request occurs it always goes through this middleware
var cnt = 0
app.use((req, res, next) => {
  /** connect-flash test, once data is queried, the buffer is emptied*/
  /**
  req.flash("count", cnt++);
  console.log("message" ,   req.flash('count'));
  console.log("message" ,   req.flash('count'));
   */
  // Session.findById(req.sessionID)
  //   .then(session=>{
  //     console.log("session :",session);
  //     if(session)
  //     {
  //       console.log("the session found");
  //       req.isLoggedIn = true;
  //     }else
  //     {
  //       console.log("there is no session found");
  //       req.isLoggedIn = false;
  //     }
  //     next();
  //   })

  // console.log(req);
  // console.log(req.session)
  if(req.session.user)
  {
    User.findById(req.session.user._id)
      .then(user => {
        // console.log('user check: ',typeof user, "::", user);
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  }
  else{

    next();
  }
});
// https://teamtreehouse.com/community/resrender-passing-in-object-vs-resrenderlocals-variables
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  // middleware SHOULD have this, man...
  next();
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Max',
    //       email: 'max@test.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    // });
    app.listen(3000);

  })
  .catch(err => {
    console.log(err);
  });
