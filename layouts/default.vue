<template>
  <div id="default-layout">
    <NavLeftDrawer v-if="this.$auth.loggedIn"></NavLeftDrawer>
    <div id="page-content-wrapper">
      <nuxt/>
    </div>
  </div>

</template>

<script>
  import NavSidebar from "../components/snippets/NavSidebar";
  import NavRightDrawer from "../components/snippets/NavRightDrawer";
  import NavLeftDrawer from "../components/snippets/NavLeftDrawer";
  import TopBar from "../components/snippets/TopBar";

  export default {
    middleware: ['auth'],
    components: {TopBar, NavLeftDrawer, NavRightDrawer, NavSidebar},
    data() {
      return {
      }
    },
    mounted(){
      document.body.classList.add('sidebar')
    }
  }
</script>
<style scoped lang="scss">
</style>
