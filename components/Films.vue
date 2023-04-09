<template lang="">
  <div v-if="!$apollo.loading" class="px-20 mb-3">
    <div class="my-4 mx-[auto] text-center">
      <nuxt-link
        to="/"
        class="min-w-20 border-pink-600 border-2 py-1 px-4 text-center rounded shadow-md cursor-pointer group"
      >
        <span class="text-pink-400 group-hover:text-pink-600"> Home </span>
      </nuxt-link>
    </div>
    <div class="grid grid-cols-3 gap-8 text-center justify-items-center">
      <div v-for="film in allFilms.films" :key="film.id">
        <div>
          <NuxtLink
            :to="{ name: 'film-id', params: { id: film.id } }"
            class="w-96 flex min-h-80 flex-col bg-gradient-to-br from-pink-500 via-slate-600 to-slate-700 hover:bg-pink-400 bg-gradient-to-t rounded shadow-md shadow-pink-800 py-3 relative"
          >
            <h1 class="text-4xl text-pink-800 bold font-mono px-10 mt-2 mb-6">
              {{ film.title }}
            </h1>
            <span
              class="text-[10px] border border-pink-500 w-[fit-content] mx-[auto] text-white rounded-tl rounded-br-md py-2 px-2 mb-4"
              ><b>{{ film.releaseDate }}</b></span
            >
            <p
              class="font-poppins text-white font-bold absolute bg-pink-500 rounded-full w-8 h-8 py-1 -top-3 -right-3 outline-pink-700 shadow"
            >
              {{ film.episodeID }}
              <span
                class="text-[11px] absolute bottom-0 -right-2 bg-pink-500 rounded"
                >episodes</span
              >
            </p>
            <span class="mt-3 items-center flex flex-col">
              <div
                class="bg-pink-400 w-[fit-content] px-2 rounded text-white text-xs py-1 mb-1"
              >
                Producers
              </div>
              <div class="leading-5 text-xs text-white">
                <div v-for="producer in film.producers">
                  {{ producer }}
                </div>
              </div>
            </span>
            <div
              class="flex mt-3 items-center border h-[fit-content] w-[fit-content] text-xs mx-[auto] border-pink-400 rounded-l-md rounded-r pr-2 text-pink-300"
            >
              <span class="bg-pink-400 px-2 rounded text-white py-1 mr-2">
                Director
              </span>
              {{ film.director }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import gql from "graphql-tag";

const ALL_FILMS_QUERY = gql`
  query ALL_FILMS_QUERY {
    allFilms {
      films {
        id
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
      }
    }
  }
`;

interface Film {
  title: string;
  director: string;
}

export default {
  data(): {
    name: string;
    allFilms: any;
    searchTerm: string;
    $apollo: any;
  } {
    return {
      name: "",
      allFilms: [],
      searchTerm: "",
      $apollo: "",
    };
  },

  apollo: {
    allFilms: {
      query: ALL_FILMS_QUERY,
      prefetch: true,
    },
  },
  created() {
    const films = JSON.parse(localStorage.getItem("allFilms") || "[]");
    if (Array.isArray(films)) {
      this.allFilms = films;
    }
  },
  mounted() {
    this.allFilms = this.$apollo.data.allFilms.films;

    const allFilms = localStorage.getItem("allFilms");
    console.log(JSON.parse(localStorage.getItem("allFilms") || "[]"));

    if (allFilms !== null && allFilms !== undefined) {
      this.allFilms = JSON.parse(allFilms);

      if (!Array.isArray(this.allFilms)) {
        console.error("Data retrieved from localStorage is not an array");
        this.allFilms = [];
      }
    } else {
      console.log("Data not found in local storage");
    }
  },
  updated() {
    localStorage.setItem("allFilms", JSON.stringify(this.allFilms));
  },
};
</script>
