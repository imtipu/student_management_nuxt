<template>
  <div></div>
</template>

<script>
  export default {
    middleware: ['auth'],
    name: "logout",
    methods: {
      async logout() {
        await this.$auth.logout({
          data: {
            device_id: this.device_id
          }
        });

        this.$axios.setHeader('Authorization', null);
      }
    },
    mounted(){
      this.logout();
      this.router.push('/');
    }
  }
</script>

<style scoped>

</style>
