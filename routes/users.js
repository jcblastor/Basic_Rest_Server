const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const router = Router();

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es valido').isEmail(),
  check('password', 'La contraseña debe ser mayor a 6letras').isLength({ min: 6 }),
  check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validateFields,
], createUser );

router.get('/', getUsers );

router.put('/:id', updateUser );

router.delete('/', deleteUser );


module.exports = router;
