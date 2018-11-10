<template>
<v-list two-line subheader>
  <v-subheader inset>Shopping Cart</v-subheader>

  <v-list-tile v-if="this.beersTotal == 0">
    <v-list-tile-avatar icon color="grey">
      <v-icon dark>shopping_cart</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-sub-title>Your cart is empty.</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>

  <v-list-tile
    v-for="beer in beers"
    :key="beer.id"
    avatar>

    <v-list-tile-avatar
      :style="{ cursor: 'pointer'}"
      @click="$router.push('/details/' + beer.name);">
      <img :src="beer.image_url">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
      <v-list-tile-sub-title>Quantity: {{ beer.quantity }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div>
        <v-btn
          flat
          icon
          color="indigo"
          @click="incrementBeer(beer)">
          <v-icon dark>add</v-icon>
        </v-btn>

        <v-btn v-if="beer.quantity > 1" 
          flat
          icon
          color="red lighten-3"
          @click="decrementBeer(beer)">
          <v-icon dark>remove</v-icon>
        </v-btn>
        <v-btn v-else 
          flat
          icon
          color="red"
          @click="dialog = true">
          <v-icon dark>remove</v-icon>
        </v-btn>

        <v-btn flat icon @click="dialog = true">
          <v-icon dark>delete</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="350">
          <v-card>
            <v-card-title class="headline">
              Confirmation
            </v-card-title>

            <v-card-text>
              Do you really want to delete the selected beer?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
              >
                No
              </v-btn>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="deleteBeer(beer), dialog = false"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-list-tile-action>
  </v-list-tile>

  <v-divider inset></v-divider>

  <v-list-tile v-if="this.beersTotal > 0">
    <v-list-tile-content>
      <v-list-tile-title>Items in Cart: {{ beersQuantity }}</v-list-tile-title>
      <v-list-tile-title>
        Cart Value: {{ formatTotal(beersTotal) }}
        <span v-if="beersQuantity >= 10"
          class="red--text"
        >
          (10% Off)
        </span>
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>

  <center v-if="this.beersTotal > 0">
    <v-btn
      color="light-green"
      @click.native="$router.push('/checkout')"
    >
      Go to checkout
    </v-btn>
  </center>
</v-list>
</template>

<script>
import store from "@/store/cart.js";

export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    beers() {
      return store.state.beers;
    },
    beersTotal() {
      if(store.state.beersQuantity >= 10) {
        return this.totalWithDiscount;
      } else {
        return store.state.beersTotal;
      }
    },
    beersQuantity() {
      return store.state.beersQuantity;
    },
    totalWithDiscount() {
      return store.state.beersTotal - (store.state.beersTotal * 0.1);
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
      //var formatter = new Intl.NumberFormat("pt-BR", {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        //currency: "BRL",
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
  }
};
</script>