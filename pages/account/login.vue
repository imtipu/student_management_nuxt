<template>

  <div id="login">
    <div class="content align-middle d-flex">
      <div class="login-box text-center d-flex align-items-center">
        <form class="align-items-center" @submit="onSubmit">
          <h5>Account Login</h5>
          <div class="form-group">
            <label for="id_username">Username</label>
            <input type="text" class="form-control" name="username" v-model="form.username" id="id_username">
          </div>
          <div class="form-group">
            <label for="id_password">Password</label>
            <input type="password" class="form-control" name="passoword" v-model="form.password" id="id_password">
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-login">Login</button>
            <b-btn
              color="error"
              class="mr-4"
              @click="onReset"
            >
              Reset Form
            </b-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: "login",
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
        messages: [],
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
            this.messages = error.response.data;
            console.log(error.response.data);
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
<style scoped lang="scss">
  body{
    background-color: #1b1e21;
    min-height: 100%;
    width: 100%;
    position: absolute;
  }
  .content{
    min-height: 100%;
    position: absolute;
    width: 100%;
    text-align: center;
    background-color: #1b1e21;
  }
  .login-box{
    padding: 30px 10px;
    margin: auto;
    max-width: 320px;
    min-width: 280px;
    width: 100%;
    color: rgba(192, 228, 255, 0.85);
    min-height: 400px;
    box-shadow: 1px 3px 8px 0px rgba(192, 228, 255, 0.85);
    form{
      width: 100%;
    }
    .form-control{
      text-align: center;
      background-color: transparent;
      color: rgba(192, 228, 255, 0.85);
      border: 0;
      box-shadow: 0 0px 5px 0px rgba(192, 228, 255, 0.85);
    }
    .btn-login{
      background-color: transparent;
      transition: 500ms all;
      color: rgba(192, 228, 255, 0.85);
      width: 150px;
      border-radius: 2px;
      border: 2px solid rgba(192, 228, 255, 0.85);
      &:hover{
        color: #1b1e21;
        background-color: rgba(192, 228, 255, 0.85);
      }
    }
  }
</style>
