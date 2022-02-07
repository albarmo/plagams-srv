const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  return (accessToken = jwt.sign(payload, '146155', { expiresIn: '24h' }));
};

const verifyToken = (accessToken) => {
  return jwt.verify(accessToken, '146155');
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
