<template>
  <div id="profile" class="card page">
    <div class="card-body">
      <b-row no-gutters>
        <b-col md="1">
          <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="3">
          <b-card-body :title="user.full_name">
            <b-card-text>
              <p>Email: {{ user.email }}</p>
              <p>First Name: {{ user.first_name }}</p>
              <p>Last Name: {{ user.last_name }}</p>
              <p>Username: {{ user.username }}</p>
              <p>Type:
                <span v-if="user.is_superuser === true">
                Superuser
              </span></p>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>

    </div>
  </div>
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
