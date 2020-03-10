<template>
  <div id="dashbaord_data">
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-6 col-sm-12 col-12">
          <div class="table-box">
            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>username</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, index, key) in json_data.students">
                <td>{{ index+1 }}</td>
                <td>{{ user.full_name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.date_joined | moment("D MMM, YYYY, h:mm A") }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-12">
          <div class="table-box">
            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>username</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, index, key) in json_data.teachers">
                <td>{{ index+1 }}</td>
                <td>{{ user.full_name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.date_joined | moment("calendar") }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: ['auth'],
    name: "dashboard_data",
    data(){
      return{
        json_data: '',
      }
    },
    methods: {
      async getData() {
        await this.$axios.get(
          process.env.API_URL + '/dashboard/index_data/'
        ).then(res => {
          console.log(res.data);
          this.json_data = res.data;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped>

</style>
