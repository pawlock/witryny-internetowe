const prisma = require('../functions/prisma.js')

module.exports = {
  async getFavourites(req, res) {
    const database = await prisma.getRecords({ where: { Id: req.body.Id }, table: 'Favourite', include: { Type: true } })
    res.status(200).json({ response: database });
  },

  async addFavourite(req, res) {
    await upsertSingleRecord('Favourite', req.body) ?
      res.status(200).json({ response: "Udalo sie dodac favourita" }) :
      res.status(400).json({ error: "Nie udalo sie dodac favourita" })
  },
  
  async deleteFavourite(req, res){
    await deleteSingleRecord('Favourite', req.params.id) ?
      res.status(200).json({ reponse: "Udalo sie usunac favourita"}) :
      res.status(400).json({ error: "Nie udalo sie usunac favourita"})
  }
}