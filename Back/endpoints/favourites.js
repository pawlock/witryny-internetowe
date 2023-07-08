const express = require('express');
const router = express.Router();

const repository = require('../repository/favourites.js')


router.get('/', async (req, res) => {
  await repository.getFavourites(req, res);
})

router.post('/', async (req, res) => {
  await repository.addFavourite(req, res);
})

router.delete('/:id', async (req, res)=>{
  await repository.deleteFavourite(req, res);
})

module.exports = router;