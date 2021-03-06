<template>
 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Shopping Cart</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="beer in shoppingCart">
            <v-list-tile :key="beer.id" avatar ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
                <v-list-tile-sub-title>Price: {{ formatTotal(beer.price) }}</v-list-tile-sub-title>
                <v-list-tile-action-text>Quantity: {{ beer.quantity }}</v-list-tile-action-text>
              </v-list-tile-content>

              <v-list-tile-action>
                <div>
                  <v-btn
                    flat
                    icon
                    color="indigo"
                    @click="addToCart(beer)">
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
                    {{ formatTotal(checkHasDiscount) }} (10% Off)
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
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState ({
      shoppingCart: state => state.shoppingCart,
      beersTotal: state => state.beersTotal,
      beersQuantity: state => state.beersQuantity
    }),
    ...mapGetters ([
      'checkHasDiscount'
    ])
  },
  methods: {
    ...mapActions ({
      addToCart: 'addToCart',
      decrementBeer: 'decrementBeer',
      deleteBeer: 'deleteBeer'
    }),
    formatTotal(value) {
      //var formatter = new Intl.NumberFormat("pt-BR", {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        //currency: "BRL",
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    }
  }
}
</script>

<style scoped>
.original_price {
    text-decoration: line-through
}
</style>