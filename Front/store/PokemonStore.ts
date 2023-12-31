interface Types {
  [name: string]: string;
}

interface State {
  showAllPokemons: boolean;
  count: number;
  countMyPokemons: number;
  name: string;
  pokemon: any;
  species: any;
  weaknesses: any;
  pokemons: Pokemon[];
  favouritePokemons: any[];
  types: Types;
  typeSelected: string;
  limit: number;
  loading: boolean;
  darkMode: boolean;
}

interface Pokemon {
  name: string;
  id: number;
  sprite: string;
  types: Type[];
}

interface Type {
  "id": number,
  "slot": number,
  "typeId": number,
  "pokemonId": number,
  type: {
    "id": number,
    name: string,
    weaknesses: [{
      "id": number,
      "typeId": number,
      "weakToId": number,
      "type": {
          "id": number,
          "name": string
      }
    }]
  }
}



function formatNumber(n: number): string {
  return `#${String("00" + n).slice(-3)}`;
}

export const usePokemonStore = defineStore("PokemonStore", {
  state: (): State => ({
    showAllPokemons: true,
    count: 0,
    countMyPokemons: 0,
    name: "Pikachu",
    pokemon: {},
    species: {},
    weaknesses: {},
    pokemons: [],
    favouritePokemons: [],
    types: {
      all: "#3e75c3",
      bug: "#9bba48",
      dark: "#4a3d80",
      dragon: "#1a6bdb",
      electric: "#ffb303",
      fairy: "#e673e4",
      fighting: "#d11332",
      fire: "#f20202",
      flying: "#7fa3f0",
      ghost: "#616EB7",
      grass: "#52e02d",
      ground: "#ce8056",
      ice: "#67ebd1",
      normal: "#A0A29F",
      poison: "#8b38b0",
      psychic: "#e36b64",
      rock: "#66d9c2",
      steel: "#4b9cb3",
      water: "#379cfa",
    },
    typeSelected: "all",
    limit: 10,
    loading: false,
    darkMode: false,
  }),
  actions: {
    async get(): Promise<void> {
      try {
        const pokemon = await useApi.get(`/pokemon/${this.name.toLowerCase()}`);
        const species = pokemon.properties.description;
        const weaknesses = pokemon.types[0].type.weaknesses;


        this.pokemon = pokemon;
        this.species = species;
        this.weaknesses = weaknesses;
      } catch (e) {
        this.reset();
      }
    },
    async getAll(): Promise<void> {
      this.enableLoading();
      this.resetPokemons();

      const { count, results } = await useApi.get(`/pokemon`);
      const resultsFiltered = results.slice(0, this.addLimit());
      this.setCount(count);

      for (const { url } of resultsFiltered) {
        this.pokemons.push(await useApi.get(url));
      }

      this.disableLoading();
    },
    async getByType(): Promise<void> {
      this.enableLoading();
      this.resetPokemons();

      const { pokemonType: pokemonsOfType } = await useApi.get(
        `/type/${this.typeSelected}`
      );

      this.setCount(pokemonsOfType.length);
      const pokemonsOfTypeFiltered = pokemonsOfType.slice(0, this.addLimit());
      for (const { pokemon: pokemonOfType } of pokemonsOfTypeFiltered) {
        const pokemon = await useApi.get(pokemonOfType.url);

        if (this.pokemonIsNotImage(pokemon)) continue;

        this.pokemons.push(pokemon);
      }

      this.ordenablePokemons();

      this.disableLoading();
    },
    ordenablePokemons() {
      this.pokemons = this.pokemons.sort(
        (a: any, b: any): number => a.order - b.order
      );
    },
    pokemonIsNotImage({ sprite }: any): boolean {
      return sprite === null;
    },
    enableLoading(): void {
      this.loading = true;
    },
    disableLoading(): void {
      this.loading = false;
    },
    addLimit(): number {
      return (this.limit += 10);
    },
    setCount(count: number): void {
      this.count = count;
    },
    setMyCount(count: number): void {
      this.countMyPokemons = count;
    },
    reset(): void {
      this.name = "";
      this.pokemon = {};
      this.species = {};
      this.weaknesses = {};
    },
    resetPokemons(): void {
      this.pokemons.length = 0;
    },
    resetLimit(): void {
      this.limit = 0;
    },
    setTypeSelected(type: string): void {
      this.typeSelected = type;
    },
    isPokemonFavourite(): any{
      return this.favouritePokemons.some(obj => obj.name === this.pokemon.name);
    },
    AddFavouritePokemon() {
      if (this.isPokemonFavourite()) {
        this.favouritePokemons = this.favouritePokemons.filter(obj => obj.name !== this.pokemon.name);
      } else {
        this.favouritePokemons.push(this.pokemon);
      }
    },
    allPokemons(): boolean{
      this.showAllPokemons = !this.showAllPokemons;
       return this.showAllPokemons
    },
  },
  getters: {
    getPokemons(): any {
      return this.pokemons.map(({ name, id, sprite, types: t }) => {
        const code = formatNumber(id);
        const types = t.map(({ type }) => type.name);
        const color = this.types[types[0]];
        const image = sprite;

        return {
          code,
          name,
          types,
          color,
          image,
        };
      });
    },
    getFavouritePokemons(): any {
      return this.favouritePokemons.map(({ name, id, sprite, types: t }) => {
        const code = formatNumber(id);
        const types = t.map(({ type }: any) => type.name);
        const color = this.types[types[0]];
        const image = sprite;

        return {
          code,
          name,
          types,
          color,
          image,
        };
      });
    },
    typeIsEquals({ typeSelected }): Function {
      return function (type: string): boolean {
        return typeSelected === type;
      };
    },
    pokemonEmpty(): boolean {
      return Object.entries(this.pokemon).length === 0;
    },
    getName(): string {
      if (this.pokemonEmpty) return "????";

      return this.pokemon.name;
    },
    getCode(): string {
      if (this.pokemonEmpty) return formatNumber(0);

      return formatNumber(this.pokemon.id);
    },
    getImage(): string {
      if (this.pokemonEmpty) return "";

      return this.pokemon.sprite;
    },
    getTypes(): string[] {
      if (this.pokemonEmpty) return [];

      return this.pokemon.types.map(({ type }: any) => type.name);
    },
    getColor(): string {
      return this.types[this.getTypes[0]];
    },
    getAbout(): string {
      if (this.pokemonEmpty) return "";

      return this.species;
    },
    getWeight(): string {
      if (this.pokemonEmpty) return "0 kg";

      return `${this.pokemon.properties.weight / 10} kg`;
    },
    getHeight(): string {
      if (this.pokemonEmpty) return "0 m";

      return `${(this.pokemon.properties.height / 10).toPrecision(2)} m`;
    },
    getAbilities(): string[] {
      if (this.pokemonEmpty) return [];

      return this.pokemon.abilities.map(({ ability }: any) => ability.name);
    },
    getWeaknesses(): string[] {
      if (this.pokemonEmpty) return [];

      return this.weaknesses.map(
        ({ type }: any) => type.name
      );
    },
    getStats(): any {
      if (this.pokemonEmpty) return {};

      const stats: any = {};

      for (const { stat, base_stat } of this.pokemon.stats) {
        stats[stat.name] = base_stat;
      }

      return {
        HP: stats.hp,
        Attack: stats.attack,
        Defense: stats.defense,
        "Sp. attack": stats["special-attack"],
        "Sp. defense": stats["special-defense"],
        Speed: stats.speed,
      };
    },
    typeIsAll(): boolean {
      return this.typeSelected === "all";
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot));
}
