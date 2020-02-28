<template>
  <v-card>
    <v-card-text>
      {{ user }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    middleware: ['auth'],
    name: "profile",

    data(){
      return{

      }
    },
    head: {
      title: 'Profile',
    },
    computed: {
      user() {
        return this.$auth.user
      }
    },
    mounted() {
      // this.user = this.$auth.user;
    }
  }
</script>

<style scoped>

</style>
