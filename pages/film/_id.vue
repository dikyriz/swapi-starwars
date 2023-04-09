<template lang="">
  <div v-if="!$apollo.loading">
    <div class="my-5 ml-5">
      <nuxt-link
        to="/films"
        class="min-w-20 border-pink-600 border-2 py-1 px-4 text-center rounded shadow-md cursor-pointer group"
      >
        <span class="text-pink-400 group-hover:text-pink-600"> Back </span>
      </nuxt-link>
    </div>
    <div
      class="xl:ml-72 mt-20 bg-pink-500/30 py-4 pl-5 rounded-l border-pink-600 border-2 border-r-0 border-opacity-30 relative"
    >
      <h1
        class="xl:text-5xl text-2xl absolute xl:-top-8 -top-6 bg-pink-400 px-2 rounded shadow-md font-semibold text-pink-200 font-inter"
      >
        {{ film.title }}
      </h1>
      <p
        class="font-poppins text-xs font-semibold border border-pink-500 w-[fit-content] text-pink-500 rounded-tl rounded-br-md py-1 px-2 mt-3"
      >
        {{ film.releaseDate }}
      </p>
      <div
        class="font-poppins flex mt-3 items-center border h-[fit-content] w-[fit-content] text-xs border-pink-400 rounded-l-md rounded-r pr-2 text-pink-500"
      >
        <span class="bg-pink-400 px-2 rounded-l text-white py-1 mr-2">
          Producers
        </span>
        <div v-for="producer in film.producers" class="mr-1">
          {{ producer }},
        </div>
      </div>

      <div
        class="font-poppins flex mt-3 items-center border h-[fit-content] w-[fit-content] text-xs border-pink-400 rounded-l-md rounded-r pr-2 text-pink-500"
      >
        <span class="bg-pink-400 px-2 rounded-l text-white py-1 mr-2">
          Director
        </span>
        {{ film.director }}
      </div>
      <div
        class="font-poppins flex mt-3 items-center border h-[fit-content] w-[fit-content] text-xs border-pink-400 rounded-l-md rounded-r pr-2 text-pink-500"
      >
        <span class="bg-pink-400 px-2 rounded-l text-white py-1 mr-2">
          Episodes
        </span>
        {{ film.episodeID }}
      </div>
      <div
        class="mt-4 xl:mr-52 font-poppins bg-white rounded border-4 border-pink-700 border-opacity-30"
      >
        <div class="bg-pink-400 shadow">
          <span class="font-semibold text-lg text-white pl-2">Description</span>
        </div>
        <p
          class="indent leading-7 text-justify text-md tracking-wider text-pink-700 px-2"
        >
          {{ film.openingCrawl }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import gql from "graphql-tag";
const FILM_DETAIL_QUERY = gql`
  query Query($filmId: ID) {
    film(filmID: $filmId) {
      title
      producers
      director
      episodeID
      openingCrawl
      releaseDate
    }
  }
`;

interface MyPageProps {
  id: string;
  film: any;
}

export default {
  async asyncData({ app, params }: Context): Promise<MyPageProps> {
    const client = app.apolloProvider.defaultClient;

    const buf = Buffer.from(params.id, "base64");
    const filmId = buf.toString("ascii").split(":")[1];
    console.log(filmId);

    const res = await client.query({
      query: FILM_DETAIL_QUERY,
      variables: {
        filmId,
      },
    });

    const { film } = res.data;

    return {
      id: filmId,
      film,
    };
  },
};
</script>
