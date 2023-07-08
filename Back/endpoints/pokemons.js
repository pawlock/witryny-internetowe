const express = require('express');
const router = express.Router();

const repository = require('../repository/pokemons.js')


router.get('/', async (req, res) => {
  await repository.getPokemons(req, res);
})

router.get('/:name', async (req, res) => {
  await repository.getThisPokemon(req, res);
})

router.post('/', async (req, res) => {
  const logic = await repository.addPokemon(req, res);
  res.send(logic);
})

router.patch('/:id', async (req, res) =>{
  const logic = await repository.updatePokemon(req, res);
  res.send(logic);
})

router.delete('/:id', async (req, res)=>{
  const logic = await repository.deletePokemon(req, res);
  res.send(logic);
})

module.exports = router;