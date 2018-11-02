<template>
  <v-list two-line subheader>
    <v-subheader inset>Shopping Cart</v-subheader>

    <v-list-tile
      v-for="beer in beers"
      :key="beer.id"
      avatar
    >
      <v-list-tile-avatar>
        <img :src="beer.image_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
        <v-list-tile-sub-title>Quantidade: {{ beer.quantity }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <div>
          <v-btn flat icon color="indigo" v-on:click="incrementBeer(beer)">
            <v-icon dark>add</v-icon>
          </v-btn>

          <v-btn flat icon color="red" v-on:click="decrementBeer(beer)">
            <v-icon dark>remove</v-icon>
          </v-btn>

          <v-btn flat icon v-on:click="deleteBeer(beer)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </div>
      </v-list-tile-action>
    </v-list-tile>

    <v-divider inset></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>Valor Total: {{ formatTotal(qty) }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <center>
      <v-btn color="light-green" @click.native="$router.push('/cart-end')">
        Finalizar Compra
      </v-btn>
    </center>

  </v-list>
</template>

<script>
import store from "@/store/cart.js";

export default {
  computed: {
    beers() {
      return store.state.beers;
    },
    qty() {
      return store.state.qty;
    }
  },
  methods: {
    incrementBeer(beer) {
      store.commit("incrementBeer", beer);
    },
    decrementBeer(beer) {
      store.commit("decrementBeer", beer);
    },
    deleteBeer(beer) {
      store.commit("deleteBeer", beer);
    },
    formatTotal(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
  }
};
</script>