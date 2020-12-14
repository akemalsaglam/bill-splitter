const express = require('express');
const router = express.Router();
const {devConfig} = require('../../config');
const queryString = require('query-string');
const axios = require('axios');

const stringifiedParams = queryString.stringify({
  client_id: devConfig.googleAuth.clientId,
  redirect_uri: devConfig.googleAuth.redirectUri,
  scope: devConfig.googleAuth.scope.join(' '), // space seperated string
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
      client_id: devConfig.googleAuth.clientId,
      client_secret: devConfig.googleAuth.clientSecret,
      redirect_uri: devConfig.googleAuth.redirectUri,
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
