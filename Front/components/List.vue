<template>
  <section class="List">
    <div class="flex flex-wrap justify-center mt-5">
      <transition-group name="bounce">
      <MiniCard
        v-for="{ code, name, types, color, image } in pokemons"
        @click="getPokemon(name)"
        :code="code"
        :name="name"
        :key="name"
        :types="types"
        :color="color"
        :image="image"
        class="mt-12 mx-2 sm:max-w-xs hover:scale-105 transition-transform"
      />
    </transition-group>

    </div>

    <p
      :class="{ disabled: PokemonStore.loading }"
      class="flex justify-center w-full mt-10"
    >
      <button
        v-if="PokemonStore.showAllPokemons"
        @click="loadMore"
        class="p-3 mb-8 px-6 rounded-lg font-medium text-sm bg-slate-100 dark:bg-slate-800"
      >
        More Pokémons
      </button>
    </p>
  </section>
</template>
<script setup lang="ts">
interface Props {
  pokemons: any[];
}
defineProps<Props>();

// data
const PokemonStore = usePokemonStore();

// methods
function getPokemon(name: string): void {
  PokemonStore.name = name;
  PokemonStore.get();

  const top = window.innerWidth >= 768 ? 0 : 425;
  window.scrollTo({ top: top, behavior: "smooth" });
}

function loadMore(): void {
  if (PokemonStore.typeIsAll ) {
    PokemonStore.getAll();
    return;
  }

  PokemonStore.getByType();
}
</script>

<style scoped>

.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  display: none;
  animation: bounce-in 0 ;
}
@keyframes bounce-in {
  0% {
      transform: scale(0);
  }
  50% {
      transform: scale(1.25);
  }
  100% {
      transform: scale(1);
  }
}
</style>
