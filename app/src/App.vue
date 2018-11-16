<template>
  <v-app>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-title :style="{ cursor: 'pointer'}"
        v-text="title"
        @click="$router.push('/')">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn mr-2 icon @click.stop="rightDrawer = !rightDrawer">
        <v-badge right>
          <span slot="badge">{{ beersQuantity }}</span>
          <v-icon>menu</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view :key="$route.fullPath"/>
    </v-content>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <cartList />
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import CartList from "./components/CartList.vue"
import { mapState } from "vuex"

export default {
  name: "BeerCompany",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Beer Company",
    }
  },
  computed: {
    ...mapState ({
      beersQuantity: state => state.beersQuantity
    })
  },
  components: {
    CartList
  }
}
</script>