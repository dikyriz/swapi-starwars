<template lang="">
  <div v-if="!$apollo.loading">
    <div
      class="relative flex flex-col items-top justify-center min-h-screen sm:items-center sm:pt-0 relative"
    >
      <div class="absolute top-4 left-4">
        <nuxt-link
          to="/characters"
          class="min-w-20 border-pink-600 border-2 py-1 px-4 text-center rounded shadow-md cursor-pointer group"
        >
          <span class="text-pink-400 group-hover:text-pink-600"> Back </span>
        </nuxt-link>
      </div>
      <h1 class="font-mono text-4xl text-pink-600 mb-3 mx-[auto] lg:mx-0">
        {{ person.name }}
      </h1>
      <div class="grid xl:grid-cols-3 gap-4 px-6">
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2 col-span-2 xl:col-span-1"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2">Gender</span>
          </div>
          <h3 class="text-lg uppercase font-semibold">{{ person.gender }}</h3>
        </div>
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2 col-span-2"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2"
              >Skin Color</span
            >
          </div>
          <p class="text-lg uppercase font-semibold">
            {{ person.skinColor }}
          </p>
        </div>
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2 col-span-2"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2"
              >Hair Color</span
            >
          </div>
          <p class="text-lg uppercase font-semibold">
            {{ person.hairColor }}
          </p>
        </div>
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2">Eye Color</span>
          </div>
          <p class="text-lg uppercase font-semibold">
            {{ person.eyeColor }}
          </p>
        </div>
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2">Mass</span>
          </div>
          <p class="text-lg uppercase font-semibold">
            {{ person.mass }}
          </p>
        </div>
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2">Height</span>
          </div>
          <p class="text-lg uppercase font-semibold">
            {{ person.height }}
          </p>
        </div>
        <div
          class="bg-white shadow-pink-500 rounded shadow xl:w-96 font-poppins text-center pb-2"
        >
          <div class="bg-pink-400 rounded-t mb-2">
            <span class="font-semibold text-lg text-white pl-2">BirthYear</span>
          </div>
          <p class="text-lg uppercase font-semibold">
            {{ person.birthYear }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Context } from "@nuxt/types";
import gql from "graphql-tag";
const CHARACTER_DETAIL_QUERY = gql`
  query Query($personId: ID) {
    person(personID: $personId) {
      name
      gender
      skinColor
      mass
      height
      hairColor
      eyeColor
      birthYear
    }
  }
`;

interface MyPageProps {
  id: string;
  person: any;
}

export default {
  async asyncData({ app, params }: Context): Promise<MyPageProps> {
    const client = app.apolloProvider.defaultClient;

    const buf = Buffer.from(params.id, "base64");
    const personId = buf.toString("ascii").split(":")[1];
    console.log(personId);

    const res = await client.query({
      query: CHARACTER_DETAIL_QUERY,
      variables: {
        personId,
      },
    });
    console.log(res);

    const { person } = res.data;

    return {
      id: personId,
      person,
    };
  },
};
</script>
<style lang=""></style>
