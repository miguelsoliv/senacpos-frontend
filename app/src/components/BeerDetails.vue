<template>
<div>
  <v-flex :key="beer.id">
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ beer.name }}</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
            <v-card-text>
              <v-card-title primary-title>
                <div>
                  <v-img :src="beer.image_url" height="200px" contain/>
                  <div>
                    <span class="headline">Alcohol By Volume: </span>{{ beer.abv }}
                  </div>
                  <div>
                    <span class="headline">Tagline: </span>{{ beer.tagline }}
                  </div>
                  <div>
                    <span class="headline">First Brewed: </span>{{ beer.first_brewed }}
                  </div>
                  <div>
                    <span class="headline">Description: </span>{{ beer.description }}
                  </div>
                </div>
              </v-card-title>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="light-green"
                @click="addToCart(beer), snackbar = true"
              >
                Add to cart
              </v-btn>
              <v-btn
                color="primary"
                @click.native="$router.go(-1)"
              >
                Back
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
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</div>
</template>

<script>
import axios from "axios"
import { mapActions } from "vuex"

export default {
  beforeMount() {
    axios
      .get("https://api.punkapi.com/v2/beers?beer_name=" + this.$route.params.beer_name)
      .then(response => (this.beer = response.data[0]))
  },
  data() {
    return {
      beer: null,
      snackbar: false
    }
  },
  methods: {
    ...mapActions ({
      addToCart: 'addToCart'
    })
  }
}
</script>