<template>
<div>
  <v-layout justify-center>
    <v-flex xs6>
      <v-select
        :items="categories"
        v-model="selectedValue"
        item-text="text"
        item-value="value"
        menu-props="auto"
        label="Select filter to apply (ABV greater than)"
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
      //Iterate through beers: []
      /*categories: [
        {
          value: "0",
          text: "Show All"
        },
        {
          value: "7",
          text: "ABV > 7"
        },
        {
          value: "8",
          text: "ABV > 8"
        },
        {
          value: "9",
          text: "ABV > 9"
        },
        {
          value: "10",
          text: "ABV > 10"
        },
        {
          value: "12",
          text: "ABV > 12"
        },
        {
          value: "14",
          text: "ABV > 14"
        }
      ]
      */
      // Iterate through axios.get()
      categories: [
        {
          value: "0",
          text: "Show All"
        },
        {
          value: "5",
          text: "ABV > 5"
        },
        {
          value: "10",
          text: "ABV > 10"
        },
        {
          value: "15",
          text: "ABV > 15"
        },
        {
          value: "20",
          text: "ABV > 20"
        },
        {
          value: "35",
          text: "ABV > 35"
        },
        {
          value: "50",
          text: "ABV > 50"
        }
      ]
    };
  },
  watch: {
    selectedValue(newValue) {
      if(newValue == "0") {
        this.beers = this.beersOriginal;
      } else {
        //Iterate through beers: []
        /*var beersToShow = [];
        for (var i = 0; i < this.beersOriginal.length; i++) {
          if(this.beersOriginal[i].abv > newValue){
            beersToShow.push(this.beersOriginal[i]);
          }
        }
        this.beers = beersToShow;*/

        // Iterate through axios.get()
        axios
          .get("https://api.punkapi.com/v2/beers?abv_gt=" + newValue)
          .then(response => (this.beers = response.data));
      }
    }
  },
  components: {
    BeerCard
  }
};
</script>