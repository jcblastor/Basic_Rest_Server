const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if(!token) return res.status(401).json({
    msg: 'No hay token en la petición'
  });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(uid);
    if(!user) return res.status(401).json({
      msg: 'User nor found'
    });

    if(!user.state) return res.status(401).json({
      msg: 'Token no válido - user-state = false'
    });

    req.user = user;
    req.uid = uid;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
}

module.exports = {
  validateJWT
}