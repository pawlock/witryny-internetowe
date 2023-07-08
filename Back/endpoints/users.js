const express = require('express');
const router = express.Router();

const repository = require('../repository/users.js')


router.get('/', async (req, res) => {
  await repository.getUsers(req, res);
})

router.get('/:id', async (req, res) => {
  await repository.getUsers(req, res);
})

router.post('/', async (req, res) => {
  await repository.addUser(req, res);
})

router.patch('/:id', async (req, res) =>{
  await repository.updateUser(req, res);
})

router.delete('/:id', async (req, res)=>{
  await repository.deleteUser(req, res);
})

module.exports = router;