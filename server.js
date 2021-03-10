require('dotenv').config();
const express = require('express');
const shortid = require('shortid');
const path = require('path');

const mailer = require('./mailer');
const db = require('./database/connection');
const Referral = require('./database/referral');

shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/refcode', async (req, res, next) => {
  try {
    const { name = undefined, email = undefined } = req.body;
    const code = shortid.generate();
    const referral = await Referral.create({ name, email, code });

    await mailer(referral);

    res.render('referral', {
      code,
    });
  } catch (error) {
    console.log(error);
    // req.session.error = true;
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
