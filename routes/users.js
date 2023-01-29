const { Router } = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const router = Router();

router.post('/', createUser );

router.get('/', getUsers );

router.put('/:id', updateUser );

router.delete('/', deleteUser );


module.exports = router;
