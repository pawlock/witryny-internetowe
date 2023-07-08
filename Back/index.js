const express = require('express');
var cors = require('cors')
const app = express();
app.use(express.json());
const port = 2137;
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.listen(port, () => { console.log(`Serwer działa na porcie: ${port}`) });
app.get('/', (req, res) => { res.send('Witaj w API pokedex!') });

const userRoutes = require('./endpoints/users.js')
app.use('/users', userRoutes)

const pokemonRoutes = require('./endpoints/pokemons.js')
app.use('/pokemon', pokemonRoutes)

const favouriteRoutes = require('./endpoints/favourites.js')
app.use('/favourites', favouriteRoutes)

const typesRoutes = require('./endpoints/types.js')
app.use('/type', typesRoutes)
