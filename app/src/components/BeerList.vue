<template>
<div>
  <v-layout justify-center>
    <v-flex xs6>
      <v-select
        :items="categories"
        v-model="selectedValue"
        item-text="text"
        item-value="id"
        menu-props="auto"
        label="Select filter to apply (IBU)"
        hide-details
        prepend-icon="search"
        single-line>
      </v-select>
    </v-flex>
  </v-layout>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="beer in beers" :key="beer.id" xs4>
        <!-- Passamos a prop com a nossa cerveja específica para ser renderizada no card. -->
        <BeerCard :beer="beer" />
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import BeerCard from "../components/BeerCard.vue"
import { mapState, mapActions } from "vuex"

export default {
  created() {
    this.getAllBeers()
  },
  data() {
    return {
      selectedValue: null,
      categories: [
      {
        id: "0",
        text: "Show All"
      },
      {
        id: "1",
        text: "Lambic (0-10)",
        val1: 0,
        val2: 10
      },
      {
        id: "2",
        text: "Wheat beer (8-18)",
        val1: 8,
        val2: 18
      },
      {
        id: "3",
        text: "American lager (8-26)",
        val1: 8,
        val2: 26
      }
    ]
    }
  },
  computed: {
    ...mapState ({
      beers: state => state.beers
    })
  },
  methods: {
    ...mapActions ({
      getAllBeers: 'getAllBeers',
      applyFilter: 'applyFilter'
    })
  },
  watch: {
    selectedValue(newValue) {
      this.applyFilter({
        val1: this.categories[newValue].val1,
        val2: this.categories[newValue].val2
      })
    }
  },
  components: {
    BeerCard
  }
}
</script>