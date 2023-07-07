const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()
prisma.$connect()
prisma.$disconnect()
const urlRoot = 'https://pokeapi.co/api/v2/'

main();

async function main() {
  // await addPokemonTypeValues(); 
  // await addPokemonAbilities();
  // await addPokemonStats();
  // await addPokemons();
  // await addPokemonTypes();
  // await addPokemonProperties();
  // await addPokemonAbilitiesList();
  await addPokemonStatsList();

  console.log('finished')
}

async function addPokemonTypeValues() {
  let data = await callApi('type/?limit=40')
  //mapa bo u nas w bazie uzywamy tylko name na ten moment
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
  let data = await callApi('pokemon/?limit=1300');
  data = data.results.map(item => { return { name: item.name } });
  await addToDatabase('Pokemon', data);
}

// to dalo sie zrobic latwiej ale juz tak zrobilem i dziala jutro to ogarne najwyzej
async function addPokemonTypes() {
  let pokemons = await getFromDatabase('Pokemon');
  let typeValues = await getFromDatabase('PokemonTypeValue');
  let listOfPokemontypes = [];
  let toCreate = [];
  let data;

  for (let pokemon of pokemons) {
    data = await callApi('pokemon/' + pokemon.name);
    data.types.pokemonId = data.id
    listOfPokemontypes.push(data.types)
  }

  for (let pokemonType of listOfPokemontypes) {
    pokemonType.forEach(item => {
      toCreate.push({
        pokemonId: pokemonType.pokemonId,
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
  let toCreate = [];

  for (let pokemon of pokemons) {
    data = await callApi('pokemon/' + pokemon.name);
    toCreate.push({
      height: data.height,
      weight: data.weight,
      description: "test",
      pokemonId: pokemons.find(pokemon => pokemon.name == data.name).id
    });
  }

  addToDatabase('PokemonProperties', toCreate);
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

    console.log(toCreate[toCreate.length - 1].pokemonId);
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
    console.log(toCreate[toCreate.length - 1].pokemonId);
  }
  console.log(toCreate)
  await addToDatabase('PokemonStatsList', toCreate);
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