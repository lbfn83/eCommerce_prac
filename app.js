const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');

const User = require('./models/user');
// const Session = require('./models/session');
const MONGODB_URI = 'mongodb://localhost:27017/shop3?retryWrites=true'
const app = express();
const store = new MongoDBStore({
  uri : MONGODB_URI ,
  collection: 'sessions'
})
// console.log("store : ", store);

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);
// When every request occurs it always goes through this middleware
app.use((req, res, next) => {
  
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
