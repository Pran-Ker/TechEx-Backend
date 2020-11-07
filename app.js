require('dotenv').config();
require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const path = require('path');
const signup = require('./routes/signupRoute.js');

const app = express();
const port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/static', express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/signup', signup);

app.post('/subscribe', async (req, res) => {
  if (!req.body.captcha) {
    return res.json({ success: false, msg: 'Please select captcha' });
  }
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
  if (body.success !== undefined && !body.success) {
    return res.json({ success: false, msg: 'Failed captcha verification' });
  }

  // If successful
  return res.json({ success: true, msg: 'Captcha passed' });
});


app.get('/', (req, res) => {
  res.render('signup');
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
