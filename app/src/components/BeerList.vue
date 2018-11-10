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
import axios from "axios";
import BeerCard from "../components/BeerCard.vue";

export default {
  mounted() {
    axios
      .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
      .then(response => (this.beers = response.data, this.beersOriginal = response.data));
  },
  data() {
    return {
      beersOriginal: [],
      beers: [],
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
    };
  },
  watch: {
    selectedValue(newValue) {
      if(newValue == "0") {
        this.beers = this.beersOriginal;
      } else {
        axios
          .get("https://api.punkapi.com/v2/beers?ibu_gt=" + this.categories[newValue].val1 +
            "&ibu_lt=" + this.categories[newValue].val2)
          .then(response => (this.beers = response.data));
      }
    }
  },
  components: {
    BeerCard
  }
};
</script>