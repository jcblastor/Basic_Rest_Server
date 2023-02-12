const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, tieneRole , isAdminRole } = require('../middlewares');

const { isValidRole, existEmail, existUser } = require('../helpers/db-validators');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');


const router = Router();

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe ser mayor a 6letras').isLength({ min: 6 }),
  check('email', 'El correo no es valido').isEmail().custom( existEmail ),
  check('role').custom( isValidRole ),
  validateFields,
], createUser );

router.get('/', getUsers );

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId().custom( existUser ),
  check('role').custom( isValidRole ),
  validateFields,
], updateUser );

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId().custom( existUser ),
  validateFields,
], deleteUser );


module.exports = router;
