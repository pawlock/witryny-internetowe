const prisma = require('../functions/prisma.js')

module.exports = {
  async getPokemons(req, res) {
    const database = await prisma.getRecords({table: 'Pokemon', select: { name: true }, take: 1})
    for (const object of database) {
      object.url = `http://localhost:2137/pokemon/${object.name}`
    }
    const count = database.length;
    res.status(200).json({ count: count, results: database});
  },
  
  async getThisPokemon(req, res) {
    const database = await prisma.getRecords({ where: { name: req.params.name }, table: 'Pokemon', include: { types: { include: {type:{ include: {weaknesses: {include:{type:true}}}}}}, properties: true, abilities: { include: {ability:true}}, stats: { include: {stat:true}} } })
    res.status(200).json(database[0]);
  },

  async addPokemons(req, res) {
    // if (!req.body.Name) res.status(400).json({ error: "Musisz podac imie uzytkownika" });
    // if (!req.body.Surname) res.status(400).json({ error: "Musisz podac Nazwisko uzytkownika" });

    // await prisma.upsertRecords('User', req.body) ?
    await upsertSingleRecord('Pokemon', req.body) ?
      res.status(200).json({ response: "Udalo sie dodac uzytkownika" }) :
      res.status(400).json({ error: "Nie udalo sie dodac uzytkownika" })
  },

  async updatePokemon(req, res) {
     await updateSingleRecord('Pokemon', req) ?  
      res.status(200).json({ response: "Udalo sie zaktualizowac uzytkownika" }) :
      res.status(400).json({ error: "Nie udalo sie zaktualizowac uzytkownika" })
  
  },
  
  async deletePokemon(req, res){
    await deleteSingleRecord('Pokemon', req.params.id) ?
      res.status(200).json({ reponse: "Udalo sie usunac uzytkownika"}) :
      res.status(400).json({ error: "Nie udalo sie usunac uzytkownika"})
  }
}