const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { validationResult } = require('express-validator');

const getUsers = (req = request, res = response) => {
  const { q, name = 'no-name', apiKey } = req.query;

  res.status(201).json({
    msg: 'GET api - desde el controller',
    q,
    name,
    apiKey,
  });
}

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  
  // verificar si el correo existe
  const existEmail = await User.findOne({ email });
  if ( existEmail ) return res.status(400).json({
    msg: 'El correo ya esta en uso'
  });

  // encriptar el password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // guardar en db
  await user.save()  
  
  res.status(201).json({
    user
  });
}

const updateUser = (req = request, res = response) => {
  const { id } = req.params;

  res.status(201).json({
    msg: 'PUT api - desde el controller'
  });
}

const deleteUser = (req, res = response) => {
  res.status(201).json({
    msg: 'DELETE api - desde el controller'
  });
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}