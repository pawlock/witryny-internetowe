<template>
    <Badge
        @click="PokemonStore.AddFavouritePokemon"
        v-if="!PokemonStore.pokemonEmpty"
        class=" mr-1 mb-1 [&_img]:hover:scale-105 z-100	">
        <transition name="bounce">
            <!-- <img v-if="!PokemonStore.isPokemonFavourite()" :src="dark.value  ? '/heart.svg' : '/heart-dark.svg'"  class=" w-5 transition-transform" />
            <img v-else :src="dark.value  ? '/filledHeart.svg' : '/filledHeart-dark.svg'" class="favourite w-5 transition-transform" /> -->
            <img v-if="!PokemonStore.isPokemonFavourite()" src="/heart.svg"  class=" w-5 transition-transform" />
            <img v-else src="/filledHeart.svg" class="favourite w-5 transition-transform" />
            <!-- <img src="/filledHeart.svg" class="favourite w-5 transition-transform" /> -->

        </transition>
    </Badge>
  </template>

<script setup lang="ts">
// const dark = useCookie<boolean>("dark");
const PokemonStore = usePokemonStore();
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
