const express = require('express');

const router = express.Router();
const queryString = require('query-string');
const axios = require('axios');
const { devConfig } = require('../../config');

const oauthParams = queryString.stringify({
  client_id: devConfig.googleAuth.clientId,
  redirect_uri: devConfig.googleAuth.redirectUri,
  scope: devConfig.googleAuth.scope.join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

router.get('/', async (req, res) => {
  const link = '<a href='
      + `https://accounts.google.com/o/oauth2/v2/auth?${oauthParams}`
      + '> Login with Google</a>';
  res.send(link);
});

async function getAccessTokenFromCode(code) {
  const { data } = await axios({
    url: devConfig.googleAuth.tokenUri,
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

async function getGoogleUserInfo(accessToken) {
  const { data } = await axios({
    url: devConfig.googleAuth.userInfoUri,
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

router.get('/google', async (req, res) => {
  const accessToken = await getAccessTokenFromCode(req.param('code'));
  const userInfo = await getGoogleUserInfo(accessToken);
  res.send(userInfo);
});

module.exports = router;
