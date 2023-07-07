const prisma = require('../functions/prisma.js')

module.exports = {
  async getFavourites(req, res) {
    const database = await prisma.getRecords({ where: { Id: req.body.Id }, table: 'Favourite', include: { Type: true } })
    res.status(200).json({ response: database });
  },

  async addFavourites(req, res) {
    // if (!req.body.Name) res.status(400).json({ error: "Musisz podac imie uzytkownika" });
    // if (!req.body.Surname) res.status(400).json({ error: "Musisz podac Nazwisko uzytkownika" });

    // await prisma.upsertRecords('User', req.body) ?
    await upsertSingleRecord('Favourite', req.body) ?
      res.status(200).json({ response: "Udalo sie dodac uzytkownika" }) :
      res.status(400).json({ error: "Nie udalo sie dodac uzytkownika" })
  },
  
  async deleteFavourite(req, res){
    await deleteSingleRecord('Favourite', req.params.id) ?
      res.status(200).json({ reponse: "Udalo sie usunac uzytkownika"}) :
      res.status(400).json({ error: "Nie udalo sie usunac uzytkownika"})
  }
}