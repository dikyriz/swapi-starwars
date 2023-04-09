<template lang="">
  <div v-if="!$apollo.loading" class="px-20">
    <div class="my-4 mx-[auto] text-center">
      <nuxt-link
        to="/"
        class="min-w-20 border-pink-600 border-2 py-1 px-4 text-center rounded shadow-md cursor-pointer group"
      >
        <span class="text-pink-400 group-hover:text-pink-600"> Home </span>
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
    <div class="grid grid-cols-5 gap-4 my-5">
      <div v-for="(character, index) in slicedPeople" :key="index">
        <!-- <div v-for="character in allPeople.people" :key="index"> -->
        <div>
          <NuxtLink
            :to="{ name: 'character-id', params: { id: character.id } }"
            class="min-h-48 flex flex-col bg-gradient-to-b from-pink-500 via-slate-600 to-slate-700 hover:bg-pink-400 bg-gradient-to-t rounded shadow-md shadow-pink-800 py-3 relative font-poppins"
            ><h1
              class="text-2xl text-pink-800 font-bold font-mono mt-2 text-center px-5"
            >
              {{ character.name }}
            </h1>
            <span class="text-center uppercase text-xs font-medium">{{
              character.gender
            }}</span>
            <div
              class="flex mt-5 items-center border h-[fit-content] w-[fit-content] text-xs mx-[auto] border-pink-400 rounded-l-md rounded-r pr-2 text-pink-300"
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

  // async asyncData({ app }: Context): Promise<QueryResponse> {
  //   // const client = app.apolloProvider.defaultClient;
  //   // console.log(client);
  //   // const res = await client.query({
  //   //   query: ALL_CHARACTERS_QUERY,
  //   //   prefetch: true,
  //   // });
  //   const { data } = await app.$hasura({
  //     query: print(ALL_CHARACTERS_QUERY),
  //   });
  //   // console.log(data);
  //   return {
  //     allPeople: data.people,
  //   };

  //   // const { people } = res.data;
  //   // return {
  //   //   allPeople: people,
  //   // };
  // },
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
