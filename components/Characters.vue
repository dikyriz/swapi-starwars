<template lang="">
  <div
    v-if="!$apollo.loading"
    class="xl:px-20 px-6 grad filters colors min-h-screen"
  >
    <div class="py-4 mx-[auto] text-center">
      <nuxt-link
        to="/"
        class="min-w-20 border-pink-600 hover:border-white border-2 py-1 px-4 text-center rounded shadow-md cursor-pointer group"
      >
        <span class="text-pink-400 group-hover:text-white"> Home </span>
      </nuxt-link>
    </div>
    <div>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-pink-500 px-2 rounded text-white hover:text-pink-300"
      >
        Prev
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-pink-500 px-2 rounded text-white hover:text-pink-300"
      >
        Next
      </button>
    </div>
    <div class="grid xl:grid-cols-5 gap-4 py-5">
      <div v-for="(character, index) in slicedPeople" :key="index">
        <div class="px-16 lg:px-0">
          <NuxtLink
            :to="{ name: 'character-id', params: { id: character.id } }"
            class="xl:min-h-56 min-h-52 flex flex-col bg-gradient-to-b from-pink-500 via-slate-600 to-slate-700 hover:bg-pink-400 bg-gradient-to-t rounded shadow-lg shadow-pink-800 py-3 relative font-poppins"
            ><h1
              class="text-2xl text-white font-medium font-mono mt-2 text-center px-5"
            >
              {{ character.name }}
            </h1>
            <div class="bg-slate-800 rounded w-[fit-content] mx-[auto] px-3">
              <span
                class="text-center uppercase text-xs font-medium text-white"
                >{{ character.gender }}</span
              >
            </div>
            <div
              class="flex mt-5 items-center border h-[fit-content] w-[fit-content] text-xs mx-[auto] border-pink-400 rounded-l-md rounded-r pr-2 text-white absolute bottom-4 left-0 right-0"
            >
              <span class="bg-pink-400 px-2 rounded text-white py-1 mr-2"
                >Planets</span
              >
              {{ character.homeworld.name }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import gql from "graphql-tag";
import { defineComponent } from "vue";
import { Context } from "@nuxt/types";
import { print } from "graphql/language/printer";
const ALL_CHARACTERS_QUERY = gql`
  query ALL_CHARACTERS_QUERY {
    allPeople {
      people {
        id
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        homeworld {
          name
        }
      }
    }
  }
`;
interface Person {
  name: string;
}

interface AllPeople {
  people: Person[];
}

interface QueryResponse {
  allPeople: AllPeople;
}

export default defineComponent({
  apollo: {
    allPeople: {
      query: ALL_CHARACTERS_QUERY,
    },
  },
  data(): {
    limit: number;
    currentPage: number;
    allPeople?: any;
    $apollo: any;
  } {
    return {
      limit: 10,
      currentPage: 1,
      allPeople: [],
      $apollo: "",
    };
  },
  computed: {
    totalPages(): number {
      let x = this.allPeople;
      console.log(x);
      return Math.ceil(x.people.length / this.limit);
    },
    slicedPeople(): Array<{ name: string }> {
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return this.allPeople.people.slice(start, end);
    },
  },
  mounted() {
    this.allPeople = this.$apollo.data.allPeople.people;

    const allPeople = localStorage.getItem("allPeople");

    if (allPeople !== null && allPeople !== undefined) {
      this.allPeople = JSON.parse(allPeople);
    } else {
      console.log("Data not found in local storage");
    }
  },
  updated() {
    localStorage.setItem("allPeople", JSON.stringify(this.allPeople));
  },
  methods: {
    prevPage(): void {
      this.currentPage--;
    },
    nextPage(): void {
      this.currentPage++;
    },
  },
});
</script>
