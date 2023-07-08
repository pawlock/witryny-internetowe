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
  await repository.addPokemon(req, res);
})

router.patch('/:id', async (req, res) =>{
  await repository.updatePokemon(req, res);
})

router.delete('/:id', async (req, res)=>{
  await repository.deletePokemon(req, res);
})

module.exports = router;