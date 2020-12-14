const express = require('express');
const router = express.Router();

const queryString = require('query-string');
const axios = require('axios');

const clientId = '250133767697-uu60qfptgt2u9cnnnpbgu76s1f9gilnp.apps.googleusercontent.com';
const clientSecret = 'OIE5HAM1H7ZS9EtTRtql9CXa';
const redirectUri = 'http://127.0.0.1:4000/auth/google';
const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const stringifiedParams = queryString.stringify({
  client_id: clientId,
  redirect_uri: redirectUri,
  scope: scope.join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

router.get('/', async function (req, res, next) {
  const link = '<a href='
      + `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
      + "> Login with Google</a>";
  res.send(link);
});

router.get('/google', async function (req, res, next) {
  const access_token = await getAccessTokenFromCode(req.param('code'));
  const userInfo = await getGoogleUserInfo(access_token);
  res.send(userInfo);
});

async function getAccessTokenFromCode(code) {
  const {data} = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code,
    },
  });
  return data.access_token;
}

async function getGoogleUserInfo(access_token) {
  const {data} = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

module.exports = router;
