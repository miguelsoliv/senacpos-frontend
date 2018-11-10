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
      contain>
    </v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ beer.name }}</h3>
        <div>{{ beer.tagline }}</div>
        <v-list-tile-action-text>IBU: {{ beer.ibu }}</v-list-tile-action-text>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn
        flat
        color="blue"
        @click="addToCart(beer), snackbar = true"
      >
        Add to cart
      </v-btn>
      <v-btn
        flat
        color="orange"
        @click.native="$router.push('/details/' + beer.name)"
      >
        Details
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="snackbar" :timeout=1250>
      Beer added to cart
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</v-hover>
</template>

<script>
import store from "@/store/cart.js";

export default {
  //Recebendo a prop beer
  props: ["beer"],
  data() {
    return {
       snackbar: false
    };
  },
  methods: {
    addToCart(beer) {
      store.commit("addToCart", beer);
      store.commit("incrementBeer", beer);
    }
  }
};
</script>