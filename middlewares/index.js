const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validar-jwt');
const validateRole = require('../middlewares/validar-role');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRole
}