const bcrypt = require('bcrypt');


const User = require('../models/user');
exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req
  //     .get('Cookie')
  //     .split(';')[1]
  //     .trim()
  //     .split('=')[1] === 'true';


  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).
    // session에 변수가 계속 제대로 저장되지 않는 에러가 발생했었는데...
    // 강사가 답을 알려줌..
    // 실제로 mongodbstore는 좀 더딜 수 있거든..
    // 그래서 save를 해줘야 하는 경우가 있다.
    // redirect work independtly from the session so it might be requried
    then(async user => {
      try {

        // console.log('user : ', user)
        if (user) {
          await bcrypt.compare(password, user.password).then(doMatch => {
            if (doMatch) {
              req.session.user = user;
              req.session.isLoggedIn = true;
              return req.session.save((err) => {
                if(err)
                {
                  console.log("postlogin error ::: ", err);
                }
                res.redirect('/');
              });
            }
            res.redirect('/login');
          })

        }
      }
      catch (err) {
        console.log("error ", err);
      }

    })
};

exports.getLogout = (req, res, next) => {
  // you can add any key here
  req.session.destroy();
  res.redirect('/');
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
  })
}

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // each hash attempt will yield slightly different string
  // console.log(password);
  // console.log(await bcrypt.hash(confirmPassword, 12));

  // TODO : gotta send different message for each case
  // 1. string compare
  // 2. already registered user
  if (password.localeCompare(confirmPassword) !== 0) {
    console.log("two different passwords are entered");
    return res.redirect("/signup");
  }

  User.find({ "email": req.body.email }).
    then(async (userDoc) => {
      console.log("userDoc: ", userDoc);

      if (userDoc.length) {
        console.log("already registered user");
        return res.redirect("/signup");
      }

      return bcrypt.hash(req.body.password, 12).
        then(async hashedPWD => {
          const user = new User({
            email: email,
            password: hashedPWD,
            cart: { items: [] }
          });
          await user.save().
            then(result => {
              return res.redirect("/login");
            });
        })
      // else if (await bcrypt.compare(confirmPassword, password) === false) {
      //   console.log("two different passwords are entered");
      //   return res.redirect("/signup");
      // }


      // await bcrypt.compare(confirmPassword, password).
      //   then(result => {
      //     //return  true or false 
      //     console.log("result : ", result);
      //   }).
      //   catch(err => { console.log("two diff passwords", err) });

      // **Another way to create User 
      // User.create({
      //   email : email,
      //   password : password,
      //   cart : {items: [] }
      // })
    }).
    catch(err => console.log(err));
}