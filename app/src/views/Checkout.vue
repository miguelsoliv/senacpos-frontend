<template>
  <v-container fluid>

    <CartCheckout />

  </v-container>
</template>

<script>
// Importação do componente
import CartCheckout from "../components/CartCheckout.vue";

export default {
  // Registro do componente
  components: {
    CartCheckout
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>