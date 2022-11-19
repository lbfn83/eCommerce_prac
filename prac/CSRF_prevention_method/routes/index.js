
var express = require('express');
var router = express.Router();
var { randomBytes } = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    // 내가 생각할 때 계속 업데이트가 되어줘야 하기 때문에 이런식으로 하면 안될 듯. 
    if(req.session.csrf === undefined)
    {

    }
    req.session.csrf = randomBytes(100).toString('base64');
    console.log(req.session.csrf)
    console.log("aaa")
  res.render('index', { title: 'Express', token: req.session.csrf });
});

router.post('/', function(req, res, next) {
    if (!req.body.csrf) {
      return res.send(`<p style="font-size: 4rem; color: red;">
                       <strong>CSRF Token not included.</strong>
                       </p>`);
    }
    console.log(req.body)
    if (req.body.csrf !== req.session.csrf) {
      return res.send(`<p style="font-size: 4rem; color: red;">
                       <strong>CSRF tokens do not match.</strong>
                       </p>`);
    }
  
    return res.send(`<p style="font-size: 4rem;">
                     <strong>Successful request!</strong>
                     </p>`);
  });

module.exports = router;