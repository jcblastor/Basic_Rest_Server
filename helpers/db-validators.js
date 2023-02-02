const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if ( !existRole ) throw new Error(`El rol: ${role} no está registrado en la DB.`);
}

const existEmail = async (email = '') => {
  const existUser = await User.findOne({ email });
  if ( existUser ) throw new Error('El correo ya esta en uso.');
}

const existUser = async (id) => {
  const user = await User.findById( id );
  if ( !user || !user.state ) throw new Error(`El id: ${id}, no existe.`)
}

module.exports = {
  isValidRole,
  existEmail,
  existUser,
}
