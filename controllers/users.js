const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { validationResult } = require('express-validator');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query ).limit(limit).skip(desde),
  ]);

  res.status(201).json({
    total,
    users
  });
}

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encriptar el password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // guardar en db
  await user.save()  
  
  res.status(201).json({
    user
  });
}

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, state, password, google, ...user } = req.body;

  if ( password ) {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );
  }

  const newUser = await User.findByIdAndUpdate( id, user, { returnDocument: 'after' } );

  res.status(200).json({
    user: newUser
  });
}

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  // const user = await User.findByIdAndDelete( id );
  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json({
    msg: `Se elimino el usuario con id: ${user._id}`,
  });
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}