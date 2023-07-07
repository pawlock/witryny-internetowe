<template>
  <div :class="{ dark: dark }">
    <section
      class="App min-h-screen p-6 pb-0 lg:px-20 max-w-full overflow-x-hidden dark:text-white dark:bg-slate-900"
    >
      <!-- header -->
      <header class="relative w-full flex justify-between items-center">

        <img src="/pokemon.svg" class="w-32" />

        <DarkMode @change="changeDarkMode" />
      </header>

      <div  style="animation: circle 45s ease-in-out infinite;" class="absolute inset-x-0 -top-50 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div  class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[${PokemonStore.getColor}] to-[${PokemonStore.getColor}] opacity-90 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" :style="{ background: PokemonStore.getColor }" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <!-- main -->
      <main class="w-full flex flex-wrap md:mt-20">
        <article class="w-full text-center md:w-1/2 md:text-left">
          <!-- my pokedex -->
          <Badge
          v-if="PokemonStore.allPokemons"
            @click="PokemonStore.allPokemons()"
            class="py-3 px-4 bg-slate-100 dark:bg-slate-800 [&_img]:hover:rotate-90 mt-12"
          >
            <img src="/pokeball.png" class="mr-2 w-5 transition-transform" />
            <span v-if="PokemonStore.showAllPokemons">My <b class="ml-1">Pokedéx</b></span>
            <span v-if="!PokemonStore.showAllPokemons" >Global <b class="ml-1">Pokedéx</b></span>
          </Badge>

          <h1 class="text-3xl mt-10">Who is that <b>Pokémon?</b></h1>
          <p class="mt-2">Find out more about your favorite pokemons</p>

          <label class="relative">
            <InputText
              v-model="PokemonStore.name"
              @blur="PokemonStore.get()"
              class="pr-14"
            />
            <i
              class="bi bi-search w-9 h-9 flex justify-center items-center absolute text-xs -bottom-1.5 right-1.5 rounded-full cursor-pointer bg-white dark:bg-slate-700"
            ></i>
          </label>

          <div class="flex flex-col-reverse items-center">
            <!-- types -->
            <div
              :class="{ disabled: PokemonStore.loading }"
              class="types mt-10"
            >
              <Badge
                v-for="(color, type) in PokemonStore.types"
                @click="setType(type.toString())"
                :style="{ background: color }"
                :class="{
                  '!opacity-100': PokemonStore.typeIsEquals(type),
                }"
                class="m-1 text-white opacity-50 transition-transform hover:opacity-100 hover:scale-105"
              >
                <img :src="`/${type}.svg`" class="mr-2 w-3" />
                <span v-text="type"></span>
              </Badge>
            </div>
            <Card class="max-w-md mt-32 md:hidden" />
          </div>
        </article>

        <aside class="w-full hidden justify-center pl-5 md:flex md:w-1/2">
          <Card class="max-w-md" />
        </aside>
      </main>

      <div  style="animation: circle2 90s ease-in-out infinite;" class="absolute inset-y-0 -left-50 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div  class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-trfrom-[${PokemonStore.getColor}] to-[${PokemonStore.getColor}] opacity-90 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" :style="{ background: PokemonStore.getColor }" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <!-- list -->
      <Badge
        class="py-3 px-4 bg-slate-100 dark:bg-slate-800 [&_img]:hover:rotate-90 mt-12"
      >
        <img src="/pokeball.png" class="mr-2 w-5 transition-transform" />
        <b v-if="PokemonStore.showAllPokemons" v-text="PokemonStore.count" class="mr-1" /> 
        <b v-if="!PokemonStore.showAllPokemons" v-text="PokemonStore.countMyPokemons" class="mr-1" /> 
        Pokémons
      </Badge>

      <div v-if="PokemonStore.loading" class="flex justify-center my-5">
        <Spin />
      </div>
      <List v-else-if="PokemonStore.showAllPokemons" :pokemons="PokemonStore.getPokemons" />
      <List v-else-if="!PokemonStore.showAllPokemons" :pokemons="PokemonStore.getFavouritePokemons" />

    </section>
  </div>
</template>

<script setup lang="ts">

// data
const PokemonStore = usePokemonStore();
// PokemonStore.get();

const dark = useCookie<boolean>("dark");

// methods
function changeDarkMode(isDark: boolean): void {
  dark.value = isDark;
}
function setType(type: string): void {
  if(PokemonStore.showAllPokemons){PokemonStore.allPokemons()}
  PokemonStore.allPokemons();
  PokemonStore.setTypeSelected(type);
  PokemonStore.resetLimit();

  if (PokemonStore.typeIsAll) {
    PokemonStore.getAll();
    return;
  }

  PokemonStore.getByType();
}

// onMounted
onMounted(async () => {
  await PokemonStore.get();
  PokemonStore.getAll();
});
</script>

<style>
body * {
  font-family: "Poppins", sans-serif;
}

.disabled {
  cursor: no-drop;
}

.disabled * {
  user-select: none;
  pointer-events: none !important;
}

@keyframes circle {
	0% {
		transform: rotate(0deg);
	}
	10% {
		transform: rotate(36deg);
	}
	20% {
		transform: rotate(72deg);
	}
	30% {
		transform: rotate(108deg);
	}
	40% {
		transform: rotate(144deg);
	}
	50% {
		transform: rotate(180deg);
	}
	60% {
		transform: rotate(216deg);
	}
	70% {
		transform: rotate(252deg);
	}
	80% {
		transform: rotate(288deg);
	}
	90% {
		transform: rotate(324deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes circle2 {
	0% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(180deg);
	}
	50% {
		transform: rotate(360deg);
	}
	25% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(0deg);
	}
}
</style>
