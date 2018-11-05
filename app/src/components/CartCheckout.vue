<template>
 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Shopping Cart</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="beer in beers">
            <v-list-tile :key="beer.id" avatar ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
                <v-list-tile-sub-title>Quantity: {{ beer.quantity }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <div>
                  <v-btn flat icon color="indigo" v-on:click="incrementBeer(beer)">
                    <v-icon dark>add</v-icon>
                  </v-btn>

                  <v-btn v-if="beer.quantity > 1" 
                    flat icon color="red lighten-3" v-on:click="decrementBeer(beer)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                  <v-btn v-else 
                    flat icon color="red" @click="dialog = true">
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
                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                          No
                        </v-btn>
                        <v-btn color="green darken-1" flat="flat" @click="dialog = false" v-on:click="deleteBeer(beer)">
                          Yes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-list-tile-action>
            </v-list-tile>
            
            <v-divider :key="beer.id"></v-divider>
          </template>

          <v-list-tile>
            <v-list-tile-content></v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-sub-title>(10+ items grant 10% discount)</v-list-tile-sub-title>
              <v-list-tile-sub-title>Items in Cart: {{ beersQuantity }}</v-list-tile-sub-title>

              <v-list-tile-sub-title v-if="beersQuantity < 10">
                  Cart Value: {{ formatTotal(beersTotal) }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else>
                  Cart Value:
                  <span class="original_price">
                    {{ formatTotal(beersTotal) }}
                  </span>
                  <span class="red--text">
                    {{ formatTotal((beersTotal) - beersTotal * 0.1) }} (10% Off)
                  </span>
              </v-list-tile-sub-title>
            </v-list-tile-action>
          </v-list-tile>

           <v-list-tile avatar ripple>
            <v-list-tile-content></v-list-tile-content>
            <v-btn color="light-green">End Shopping</v-btn>
            <v-btn color="primary" @click.native="$router.push('/')">Back</v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import store from "@/store/cart.js";

export default {
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    beers() {
      return store.state.beers;
    },
    beersTotal() {
      return store.state.beersTotal;
    },
    beersQuantity() {
        return store.state.beersQuantity;
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

<style>
.original_price {
    text-decoration: line-through;
}
</style>