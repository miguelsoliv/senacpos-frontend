<template>
<v-hover>
  <v-card
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    class="mx-auto">
    
    <v-img
      :src="beer.image_url"
      aspect-ratio="1"
      height="200px"
      contain
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{beer.name}}</h3>
        <div>{{beer.tagline}}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="blue" v-on:click="addToCart(beer)">Adicionar</v-btn>
      <v-btn flat color="orange" @click.native="$router.push('/details')">Detalhes</v-btn>
    </v-card-actions>
  </v-card>
</v-hover>
</template>

<script>
import store from "@/store/cart.js";

export default {
  //Recebendo a prop beer
  props: ["beer"],
  data() {
    return {};
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
      store.commit("incrementBeer", beer);
    }
  }
};
</script>