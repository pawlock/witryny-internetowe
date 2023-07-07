const express = require('express');
const router = express.Router();

const repository = require('../repository/favourites.js')


router.get('/', async (req, res) => {
  const logic = await repository.getFavourites(req, res);
  res.send(logic);
})

router.post('/', async (req, res) => {
  const logic = await repository.addFavourite(req, res);
  res.send(logic);
})

router.delete('/:id', async (req, res)=>{
  const logic = await repository.deleteFavourite(req, res);
  res.send(logic);
})

module.exports = router;