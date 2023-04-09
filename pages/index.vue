<template>
  <div class="bg-black">
    <div
      class="relative flex flex-col items-top justify-center min-h-screen sm:items-center sm:pt-0"
      h-20
    >
      <h1
        class="text-8xl text-black text-stroke-pink-500 text-stroke-3 dark:text-white font-semibold mb-2 text-shadow-md"
      >
        StarWars
      </h1>
      <header class="mt-6 flex gap-x-4">
        <nuxt-link
          to="/films"
          class="min-w-20 border-pink-600 border-2 py-2 px-4 text-center rounded shadow-md shadow-pink-800 cursor-pointer group"
        >
          <span class="text-pink-400 group-hover:text-white"> Film </span>
        </nuxt-link>

        <nuxt-link
          to="/characters"
          class="min-w-20 border-pink-600 border-2 py-2 px-4 text-center rounded shadow-md shadow-pink-800 cursor-pointer group"
        >
          <span class="text-pink-400 group-hover:text-white"> Character </span>
        </nuxt-link>
      </header>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Characters from "~/components/Characters.vue";
import Films from "~/components/Films.vue";

export default Vue.extend({
  name: "IndexPage",
});
</script>
