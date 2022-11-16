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

  User.findOne({ email: req.body.email }).
    // session에 변수가 계속 제대로 저장되지 않는 에러가 발생했었는데...
    // 강사가 답을 알려줌..
    // 실제로 mongodbstore는 좀 더딜 수 있거든..
    // 그래서 save를 해줘야 하는 경우가 있다.
    // redirect work independtly from the session so it might be requried
    then(user => {
      try {

        console.log('user : ', user)
        if (user) {
          req.session.user = user;
          req.session.isLoggedIn = true;
          req.session.save((err) => {
            console.log("error ::: ", err);
            res.redirect('/');
          });
        } else {
          res.redirect('/');
        }
      }
      // req.session.isLoggedIn = true;

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
    isAuthenticated: true,
    path: '/signup',
    pageTitle: 'Signup'
  })
}

exports.postSignup = (req, res, next) => {
  User.find({ "email": req.body.email }).
    then(user => {
      console.log("user: ", user)
      if(user.length)
      {
        res.redirect("/");
      }
      
    }).
    catch(err => console.log(err));
  console.log("request: ", req.body);
}