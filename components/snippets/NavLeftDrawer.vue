<template>
  <div id="navigation">
    <nav id="top-bar" class="top-nav">
      <nuxt-link class="nav-logo" to="/">Dashboard</nuxt-link>
      <button class="btn-siddebar-toggle" @click="toggleSidebar"><i class="fas fa-bars"></i></button>
      <div class="navbar-right float-right r-0">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/account/logout/">Logout</nuxt-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" @click="openAccountDropdown" href="#" aria-haspopup="true"
               aria-expanded="false">
              {{ this.$auth.user.username }}
            </a>
            <div class="dropdown-menu" ref="account_dropdown_menu" aria-labelledby="navbarDropdownMenuLink">
              <nuxt-link class="dropdown-item" to="/account/profile/">Profile</nuxt-link>
              <nuxt-link class="dropdown-item" to="/account/settings/">Settings</nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="sidebar-left" v-bind:class="{ toggled: sidebar}">
      <div class="menu-list pt-3">
        <ul class="list-unstyled">
          <li class="menu-item">
            <a class="menu-link parent accordion">Students</a>
            <div class="sub-menu">
              <ul class="list-unstyled">
                <li class="menu-item">
                  <nuxt-link class="menu-link" to="/students/">All</nuxt-link>
                </li>
                <li class="menu-item">
                  <nuxt-link class="menu-link" to="/students/add/">Add</nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="menu-item">
            <a class="menu-link parent accordion">Teachers</a>
            <div class="sub-menu">
              <ul class="list-unstyled">
                <li class="menu-item">
                  <nuxt-link class="menu-link" to="/teachers/">All</nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="menu-item"><a class="menu-link">Link</a></li>
          <li class="menu-item"><a class="menu-link">Link</a></li>
          <li class="menu-item"><a class="menu-link">Link</a></li>

        </ul>
      </div>
    </div>

  </div>


</template>

<script>

  export default {
    components: {},
    middleware: ['auth'],
    name: "NavLeftDrawer",
    data() {
      return {
        sidebar: true,
      }
    },
    methods: {
      toggleSidebar() {
        this.sidebar = !this.sidebar;
        let body = document.body;
        if (this.sidebar === true) {
          body.classList.add('sidebar')
        } else {
          body.classList.remove('sidebar')
        }
      },
      // created: function () {
      //   this.toggleSidebar();
      // },
      openSubmenu(e) {
        e.preventDefault();
        console.log(e.target.parentElement.children[1]);
        e.target.parentElement.children[1].classList.toggle('show')
      },
      openAccountDropdown() {
        this.$refs.account_dropdown_menu.classList.toggle('show');
      }
    },
    mounted() {
      const parents = document.querySelectorAll('.menu-link.parent');
      for (const parent of parents){
        parent.addEventListener('click', function (e) {
          e.preventDefault();
          e.target.classList.toggle('open');
          console.log(e.target.parentElement.children[1]);
          e.target.parentElement.children[1].classList.toggle('show')
        })
      }

    },
    computed: {
      bg() {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>
<style scoped lang="scss">
  #sidebar-wrapper.toggled {
    visibility: visible;
    opacity: 1;
    display: block;
    margin-left: 0;
  }

  #sidebar-wrapper {
    /*display: none;*/
    width: 250px;
    max-width: 250px;
    margin-left: -250px;
    position: fixed;
    opacity: 0;
    visibility: hidden;
    padding: 0;
    -webkit-transition: 600ms all;
    transition: 600ms all;

  }

</style>
