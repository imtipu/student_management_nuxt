<template>
  <v-app class="elevation-1" light top-toolbar left-fixed-sidebar sidebar-under-toolbar>
    <NavLeftDrawer v-if="this.$auth.loggedIn"></NavLeftDrawer>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app

    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import NavSidebar from "../components/snippets/NavSidebar";
  import NavRightDrawer from "../components/snippets/NavRightDrawer";
  import NavLeftDrawer from "../components/snippets/NavLeftDrawer";

  export default {
    middleware: ['auth'],
    components: {NavLeftDrawer, NavRightDrawer, NavSidebar},
    data() {
      return {
        fixed: false,
      }
    }
  }
</script>
