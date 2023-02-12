const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {
  if(!req.user) return res.status(500).json({
    msg: 'Se quiere verificar el rol sin validar el token'
  });

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') return res.status(401).json({
    msg: `${name} no tienes permisos para realizar esta operación.`
  })

  next();
}

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if(!req.user) return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token'
    });

    if (!roles.includes(req.user.role)) return res.status(401).json({
      msg: `Para usar este metodo necesitas uno de los siguientes roles: ${roles}`
    })
    
    next();
  }
}

module.exports = {
  isAdminRole,
  tieneRole
}