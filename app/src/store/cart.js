import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
 key: 'appbeers',
 storage: localStorage
})

import {
  findIndex
} from 'lodash-es'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    beers: [],
    beersTotal: 0,
    beersQuantity: 0
  },
  mutations: {
    addToCart(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id);

      if (index === -1) {
        state.beers.push({
          id: beer.id,
          name: beer.name,
          price: 2.5,
          quantity: 0,
          image_url: beer.image_url
        })
      }
    },
    incrementBeer(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id);
      state.beersTotal += state.beers[index].price;
      state.beers[index].quantity++;
      state.beersQuantity++;
    },
    decrementBeer(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id);
      state.beersTotal -= state.beers[index].price;

      state.beers[index].quantity--;
      state.beersQuantity--;

      if (state.beers[index].quantity == 0) {
        state.beers.splice(state.beers.indexOf(beer), 1);
      }
    },
    deleteBeer(state, beer) {
      let index = findIndex(state.beers, (o) => o.id == beer.id);

      state.beersTotal -= state.beers[index].price * state.beers[index].quantity;
      state.beersQuantity -= state.beers[index].quantity;

      state.beers.splice(state.beers.indexOf(beer), 1);
    }
  },
  actions: {

  }
})