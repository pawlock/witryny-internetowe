const express = require('express');
const router = express.Router();

const repository = require('../repository/users.js')


router.get('/', async (req, res) => {
  const logic = await repository.getUsers(req, res);
  res.send(logic);
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const logic = await repository.getUsers(req, res);
  res.send(logic);
})

router.post('/', async (req, res) => {
  const logic = await repository.addUser(req, res);
  res.send(logic);
})

router.patch('/:id', async (req, res) =>{
  const logic = await repository.updateUser(req, res);
  res.send(logic);
})

router.delete('/:id', async (req, res)=>{
  const logic = await repository.deleteUser(req, res);
  res.send(logic);
})

module.exports = router;