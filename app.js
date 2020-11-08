require('dotenv').config();
// require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const path = require('path');
// const User = require('./models/User');
const { hashPassword } = require('./static/js/hash');

const app = express();
const port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/static', express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('signup');
});


app.post('/', async (req, res) => {
  console.log('1');
  console.log(req.body);
  // if (!req.body.captcha) {
  //   return res.json({ success: false, msg: 'Please select captcha' });
  // }
  // Secret key
  const secretKey = process.env.SECRET_KEY;

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress,
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // Make a request to verifyURL
  const body = await fetch(verifyURL).then((response) => response.json());

  // If not successful
  // if (body.success !== undefined && !body.success) {
  //   return res.json({ success: false, msg: 'Failed captcha verification' });
  // }

  if (!(typeof req.body.email === 'string' && typeof req.body.password === 'string')) {
    res.json({status:'Invalid'});
    return 1;
  }

  if (req.body.email.length > 150 || req.body.password.length > 150
    || req.body.name.length > 150) {
    res.json({status:'Invalid'});
    return 2;
  }

  console.log('2');

  // const newUser = new User({
  //   email: req.body.email,
  //   name: req.body.name,
  //   phone: req.body.phone,
  //   password: await hashPassword(req.body.password),
  //   timestamp: Date.now(),
  //   verified: false,
  // });

  // let student;
  // try {
  //   student = await newUser.save();
  //   console.log('3');
  // } catch (e) {
  //   console.log(`Error occured: ${e}`);
  //   return 7;
  // }
  
  res.json({ status: 'success' });

});


// ____________________________________

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
