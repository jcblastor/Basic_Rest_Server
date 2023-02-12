const { response, request } = require("express");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({
      msg: 'Usuario / Contraseña no son correctos - correo'
    })

    if (!user.state) return res.status(400).json({
      msg: 'Usuario / Contraseña no son correctos - status=false'
    })

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return res.status(400).json({
      msg: 'Usuario / Contraseña no son correctos - password'
    })

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  login
}