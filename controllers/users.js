const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  const { q, name = 'no-name', apiKey } = req.query;

  res.status(201).json({
    msg: 'GET api - desde el controller',
    q,
    name,
    apiKey,
  });
}

const createUser = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  
  res.status(201).json({
    msg: 'POST api - desde el controller',
    nombre,
    edad
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