const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => { 
  console.log(`Serwer działa na porcie: ${port}`) 
});

app.get('/', (req, res) => { res.send('Witaj w API!') });

const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()
prisma.$connect()
prisma.$disconnect()
const urlRoot = 'https://pokeapi.co/api/v2/'


main();
// deleteAll()

async function main() {
  console.log('WAIT FOR FINISH LOG it takes a while')

  await addPokemonTypeValues(); 
  await addPokemonAbilities();
  await addPokemonStats();
  await addPokemons();
  await addPokemonTypes();
  await addPokemonProperties();
  await addPokemonAbilitiesList();
  await addPokemonStatsList();
  await addPokemonTypeWeaknessesList();

  console.log('finished')
}

async function addPokemonTypeValues() {
  let data = await callApi('type/?limit=40')
  data = data.results.map(item => { return { name: item.name } });
  await addToDatabase('PokemonTypeValue', data);
}

async function addPokemonAbilities() {
  let data = await callApi('ability/?limit=400')
  await addToDatabase('PokemonAbility', data.results);
}

async function addPokemonStats() {
  let data = await callApi('stat/?limit=10')
  await addToDatabase('PokemonStat', data.results);
}

async function addPokemons() {
  let pokemons = await callApi('pokemon/?limit=1300');
  let data;
  let toCreate = [];

  for(let pokemon of pokemons.results){
    data = await callApi('pokemon/' + pokemon.name);
    toCreate.push({
      name: data.name,
      sprite: data.sprites.other.dream_world.front_default || ''
    })
  }

  await addToDatabase('Pokemon', toCreate);
}

async function addPokemonTypes() {
  let pokemons = await getFromDatabase('Pokemon');
  let typeValues = await getFromDatabase('PokemonTypeValue');
  let listOfPokemontypes = [];
  let toCreate = [];
  let data;

  for (let pokemon of pokemons) {
    data = await callApi('pokemon/' + pokemon.name);
    data.types.pokemonName = pokemon.name
    listOfPokemontypes.push(data.types)
}

  for (let pokemonType of listOfPokemontypes) {
  pokemonType.forEach(item => {
      toCreate.push({
        pokemonId: pokemons.find(pokemon => pokemon.name == pokemonType.pokemonName).id,
        slot: item.slot,
        typeId: typeValues.find(value => value.name == item.type.name).id
      })
    })
  }

  await addToDatabase('PokemonType', toCreate);
}

async function addPokemonProperties() {
  let pokemons = await getFromDatabase('Pokemon');
  let data;
  let speciesData;
  let toCreate = [];

  for (let pokemon of pokemons) {
    data = await callApi('pokemon/' + pokemon.name);
    try {
      speciesData = await callApi('pokemon-species/' + pokemon.name);
    } catch(e) {continue}
    toCreate.push({
      height: data.height,
      weight: data.weight,
      description: `${speciesData.flavor_text_entries.find(item => item.language.name == "en")?.flavor_text || "it's a cool pokemon"}`,
      pokemonId: pokemons.find(pokemon => pokemon.name == data.name).id
    });
    console.log(pokemon.id);
  }

  await addToDatabase('PokemonProperties', toCreate);
}

async function addPokemonAbilitiesList() {
  let pokemons = await getFromDatabase('Pokemon');
  let abilities = await getFromDatabase('PokemonAbility');
  let data;
  let toCreate = [];

  for (let pokemon of pokemons) {
    data = await callApi('pokemon/' + pokemon.name);

    data.abilities.forEach(ability => {
      toCreate.push({
        abilityId: abilities.find(item => item.name == ability.ability.name).id,
        is_hidden: ability.is_hidden,
        slot: ability.slot,
        pokemonId: pokemons.find(pokemon => pokemon.name == data.name).id
      });
    })
    console.log(pokemon.id);
  }
  await addToDatabase('PokemonAbilitiesList', toCreate);
}

async function addPokemonStatsList() {
  let pokemons = await getFromDatabase('Pokemon');
  let stats = await getFromDatabase('PokemonStat');
  let data;
  let toCreate = [];

  for (let pokemon of pokemons) {
    data = await callApi('pokemon/' + pokemon.name);

    data.stats.forEach(stat => {
      toCreate.push({
        base_stat: stat.base_stat,
        effort: stat.effort,
        statId: stats.find(st => st.name == stat.stat.name).id,
        pokemonId: pokemons.find(pokemon => pokemon.name == data.name).id
      });
    })
    console.log(pokemon.id);
  }
  await addToDatabase('PokemonStatsList', toCreate);
}

async function addPokemonTypeWeaknessesList(){
  let types = await getFromDatabase('PokemonTypeValue');
  let data;
  let toCreate = [];

  for (let type of types) {
    data = await callApi('type/' + type.name + '/?limit=40');
    data = data.damage_relations.double_damage_from;
    data.forEach(relation =>{
      toCreate.push({
        typeId: type.id,
        weakToId: types.find(item => item.name == relation.name).id
      })
    })
    console.log(type.id);
  }
  await addToDatabase('PokemonWeaknessesList', toCreate);
}

async function callApi(api) {
  let response = await fetch(urlRoot + api);
  return await response.json();
}

async function addToDatabase(table, data) {

  try {
    await prisma[table].createMany({
      data: data,
      skipDuplicates: true
    })
    console.log('success')
  } catch (e) { console.log(e) }
}

async function getFromDatabase(table) {
  return await prisma[table].findMany();
}

async function deleteAll(){
  await deleteAllFromDatabase('PokemonWeaknessesList');
  await deleteAllFromDatabase('PokemonStatsList');
  await deleteAllFromDatabase('PokemonStat');
  await deleteAllFromDatabase('PokemonAbilitiesList');
  await deleteAllFromDatabase('PokemonAbility');
  await deleteAllFromDatabase('PokemonProperties');
  await deleteAllFromDatabase('PokemonType');
  await deleteAllFromDatabase('PokemonTypeValue');
  await deleteAllFromDatabase('Pokemon');
  console.log('finish')
}

async function deleteAllFromDatabase(table) {
  try {
    await prisma[table].deleteMany()
    console.log('success')
  } catch (e) { console.log(e) }
}