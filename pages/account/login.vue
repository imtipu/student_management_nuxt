<template>
  <v-card
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-card-title>
      Login
    </v-card-title>
    <v-container>

      <v-form
        ref="form"
        @submit="onSubmit"
      >
        <v-text-field
          v-model="form.username"
          :counter="10"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          required
          type="password"
        ></v-text-field>

        <v-btn color="primary" dark class="mr-4" type="submit">
          Login
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="onReset"
        >
          Reset Form
        </v-btn>

      </v-form>
      <!--<v-card-text>-->
        <!--{{ response }}-->
        <!--{{ this.$auth }}-->
      <!--</v-card-text>-->

    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: "login",
    head: {
      title: 'Login',
    },
    data() {
      return{
        form: {
          username: '',
          password: '',
        },
        response: '',
        show: true,
        message: ''
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        try{
          this.$auth.loginWith('local', {
            data: {
              username: this.form.username,
              password: this.form.password
            }
          }).then(res => {
            console.log(res);
            this.response = res;
            // this.$toast.success('Logged In!');
            this.$router.push('/');
          }).catch((error) => {
            console.log(error);
            // this.$toast.error(error);
          });
          // this.$router.push('/')
        } catch (error) {
          console.log(error);
        }
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        this.form.username = '';
        this.form.password = '';
        // Trick to reset/clear native browser form validation state
        this.show = false;
      }
    },
    mounted(){
      if (this.$auth.loggedIn){
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
