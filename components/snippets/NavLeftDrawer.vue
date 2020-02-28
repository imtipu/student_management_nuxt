<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dark
      app
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span v-if="this.$auth.user">
          {{ this.$auth.user.username }}
        </span>
        <span v-else>
          Dashboard
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon nuxt to="/account/logout/">
        <v-text>Logout</v-text>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :src="bg"
      fixed
      dark
      app
      permanent
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link to="/account/profile/">
          <v-list-item-content>
             <br>
            <!--<v-btn x-small color="secondary" dark to="/account/profile/" v-if="drawer === true">Profile</v-btn>-->
            <v-list-item-title class="title">{{ this.$auth.user.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ this.$auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
        class="py-0"
      >

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    middleware: ['auth'],
    name: "NavLeftDrawer",
    data() {
      return {
        drawer: true,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Dashboard',
            to: '/'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Students',
            to: '/students'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Classes',
            to: '/classes'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Teachers',
            to: '/teachers'
          }
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        miniVariant: false,
        mini: true,
        expandOnHover: true,
        background: true,
      }
    },
    computed: {
      bg() {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>

<style scoped>

</style>
