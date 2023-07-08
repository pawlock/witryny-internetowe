const prisma = require('../functions/prisma.js')

module.exports = {
  async getByType(req, res) {
    const database = await prisma.getRecords({ where: { name: req.params.name }, table: 'PokemonTypeValue', include: {pokemonType:{include:{pokemon: {include: { types: { include: {type:{ include: {weaknesses: {include:{type:true}}}}}}, properties: true, abilities: { include: {ability:true}}, stats: { include: {stat:true}} }}}}}  })
    count = 0;
    for (const object of database[0].pokemonType) {
      object.pokemon.url = `http://localhost:2137/pokemon/${object.pokemon.name}`
      count++;
    }
    res.status(200).json(database[0]);
  },

}