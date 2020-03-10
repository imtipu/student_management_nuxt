<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="card card-counter">
            <div class="card-header">
              Student
            </div>
            <div class="card-body">
              <h5 class="float-left">Total</h5>
              <div class="counter-number float-right">{{ counters.total_students }}</div>
            </div>
            <div class="card-footer">
              <a class="counter-link"><i class="fas fa-eye"></i> View All</a>
            </div>
          </div>

        </div>
        <div class="col-md-3">
          <div class="card card-counter">
            <div class="card-header">
              Teachers
            </div>
            <div class="card-body">
              <h5 class="float-left">Total</h5>
              <div class="counter-number float-right">{{ counters.total_teachers }}</div>
            </div>
            <div class="card-footer">
              <a class="counter-link">Link</a>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-counter">
            <div class="card-header">
              Counter
            </div>
            <div class="card-body">
              <h5 class="float-left">Total</h5>
              <div class="counter-number float-right">100</div>
            </div>
            <div class="card-footer">
              <a class="counter-link">Link</a>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-counter">
            <div class="card-header">
              Counter
            </div>
            <div class="card-body">
              <h5 class="float-left">Total</h5>
              <div class="counter-number float-right">100</div>
            </div>
            <div class="card-footer">
              <a class="counter-link">Link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    middleware: ['auth'],
    props: ['user'],
    name: "dashboard_counter",
    data() {
      return {
        json_data: {
          counters: ''
        },
        counters: {}
      }
    },
    methods: {
      getData() {
        this.$axios.get(
          process.env.API_URL + '/dashboard/counter/'
        ).then(res => {
          console.log(res.data.counters);
          this.counters = res.data.counters;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
