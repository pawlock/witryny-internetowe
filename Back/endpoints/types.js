const express = require('express');
const router = express.Router();

const repository = require('../repository/types.js')


router.get('/:name', async (req, res) => {
  await repository.getByType(req, res);
})

module.exports = router;