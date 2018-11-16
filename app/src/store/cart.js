import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from "axios"

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
    shoppingCart: [],
    beersTotal: 0,
    beersQuantity: 0
  },
  getters: {
    checkHasDiscount(state) {
      if(state.beersQuantity >= 10) {
        return state.beersTotal - (state.beersTotal * 0.1)
      } else {
        return state.beersTotal
      }
    }
  },
  mutations: {
    addToCart(state, beer) {
      let index = findIndex(state.shoppingCart, (o) => o.id == beer.id)

      if (index === -1) {
        state.shoppingCart.push({
          id: beer.id,
          name: beer.name,
          price: 2.5,
          quantity: 1,
          image_url: beer.image_url
        })
      } else {
        state.shoppingCart[index].quantity++
      }

      state.beersTotal = state.shoppingCart.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0)
      state.beersQuantity++
    },
    decrementBeer(state, beer) {
      let index = findIndex(state.shoppingCart, (o) => o.id == beer.id)
      state.beersTotal -= state.shoppingCart[index].price

      state.shoppingCart[index].quantity--
      state.beersQuantity--

      if (state.shoppingCart[index].quantity == 0) {
        state.shoppingCart.splice(state.shoppingCart.indexOf(beer), 1)
      }
    },
    deleteBeer(state, beer) {
      let index = findIndex(state.shoppingCart, (o) => o.id == beer.id)

      state.beersTotal -= state.shoppingCart[index].price * state.shoppingCart[index].quantity
      state.beersQuantity -= state.shoppingCart[index].quantity

      state.shoppingCart.splice(state.shoppingCart.indexOf(beer), 1)
    },
    setBeers(state, beers) {
      state.beers = beers
    }
  },
  actions: {
    addToCart ({ commit }, beer) {
      commit('addToCart', beer)
    },
    decrementBeer ({ commit }, beer) {
      commit('decrementBeer', beer)
    },
    deleteBeer ({ commit }, beer) {
      commit('deleteBeer', beer)
    },
    getAllBeers ({ commit }) {
      axios
        .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
        .then(response => {
          let results = response.data
          commit('setBeers', results)
        })
    },
    applyFilter ({ commit }, valuesFilter) {
      if(valuesFilter.val2 > "0") {
        axios
          .get("https://api.punkapi.com/v2/beers?ibu_gt=" + valuesFilter.val1 +
          "&ibu_lt=" + valuesFilter.val2).then(response => {
            let results = response.data
            commit('setBeers', results)
          })
      } else {
        axios
          .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
          .then(response => {
            let results = response.data
            commit('setBeers', results)
          })
      }
    }
  }
})