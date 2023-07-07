const prisma = require('../functions/prisma.js')

module.exports = {
  async getUsers(req, res) {
    const database = await prisma.getRecords({ where: { Id: req.body.Id }, table: 'User', include: { Type: true } })
    res.status(200).json({ response: database });
  },

  async addUsers(req, res) {
    // if (!req.body.Name) res.status(400).json({ error: "Musisz podac imie uzytkownika" });
    // if (!req.body.Surname) res.status(400).json({ error: "Musisz podac Nazwisko uzytkownika" });

    // await prisma.upsertRecords('User', req.body) ?
    await upsertSingleRecord('User', req.body) ?
      res.status(200).json({ response: "Udalo sie dodac uzytkownika" }) :
      res.status(400).json({ error: "Nie udalo sie dodac uzytkownika" })
  },

  async updateUser(req, res) {
     await updateSingleRecord('User', req) ?  
      res.status(200).json({ response: "Udalo sie zaktualizowac uzytkownika" }) :
      res.status(400).json({ error: "Nie udalo sie zaktualizowac uzytkownika" })
  
  },
  
  async deleteUser(req, res){
    await deleteSingleRecord('User', req.params.id) ?
      res.status(200).json({ reponse: "Udalo sie usunac uzytkownika"}) :
      res.status(400).json({ error: "Nie udalo sie usunac uzytkownika"})
  }
}