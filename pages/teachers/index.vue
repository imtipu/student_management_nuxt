<template>
  <div id="teacher-index" class="page card">
    <div class="card-header">Teachers</div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <b-btn dark small clsss="ml-4" dark @click="dialog = true">Add New Teacher</b-btn>
        </div>
      </div>
      <custom_datatable :url="url" :columns="columns" v-if="this.$auth.user.is_superuser === true"/>
      <div class="alert alert-info" v-else>
        You don't have any permission to view this section.
      </div>
    </div>
    <b-modal id="modal-add" v-model="dialog" ref="teacherAddModal" centered title="BootstrapVue">
      <template v-slot:modal-header>
        <h6 class="text-info">Add New Teacher</h6>
      </template>
      <form @submit.prevent="addTeacher">
        <div class="form-group">
          <label>First Name</label>
          <input required v-model="form.first_name" class="form-control"/>
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input required v-model="form.last_name" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input required type="email" v-model="form.email" class="form-control"/>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" required v-model="form.password" class="form-control"/>
        </div>
      </form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button type="button" @click.prevent="addTeacher" class="float-left" size="sm" variant="primary">Submit</b-button>
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="formDialogClose">
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>

</template>

<script>
  import Custom_datatable from "../../components/snippets/custom_datatable";

  export default {
    middleware: ['auth'],
    name: "index",
    components: {Custom_datatable,},
    head(){
      return{
        title: 'Teachers',
      }
    },
    data() {
      return {
        url: process.env.API_URL + '/teachers/',
        columns: [
          {
            header: 'ID',
            field: 'id',
            type: 'string',
            sorting: false
          },
          {
            header: 'Username',
            field: 'username',
            type: 'string',
            sorting: true
          },
          {
            header: 'Email',
            field: 'email',
            type: 'string',
            sorting: true
          },
          {
            header: 'Firstname',
            field: 'first_name',
            type: 'string',
            sorting: true
          },
          {
            header: 'Last Name',
            field: 'last_name',
            type: 'string',
            sorting: true
          },
          {
            header: 'Full Name',
            field: 'full_name',
            type: 'string',
            sorting: false
          },
          {
            header: 'Joined',
            field: 'date_joined',
            type: 'datetime',
            sorting: true
          },
        ],
        dialog: false,
        form: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        },
        alert: false,
        snackbar: false,
        snackbar_data: {
          top: 'top',
          right: 'right',

          timeout: 6000,
          color: ''
        },
        alert_type: {
          type: '',

        }
      }

    },
    methods: {
      addTeacher(event){
        event.preventDefault();
        alert(JSON.stringify(this.form));
        this.$axios.post(
          process.env.API_URL + '/teachers/',
          this.form
        ).then(res => {
          console.log(res);
          this.dialog = false;
          this.snackbar = true;
          this.snackbar_data.color = 'success';
          this.formReset();
        }).catch(err =>{
          console.log(err);
          this.snackbar = true;
          this.snackbar_data.color = 'error';
        })
      },
      formDialogClose(){
        this.dialog = false;
        this.formReset();
      },
      formReset(){
        this.form.first_name = '';
        this.form.last_name = '';
        this.form.email = '';
        this.form.password = '';
      }
    },
    mounted(){
      // this.$refs.teacherAddModal.on('hidden.bs.modal', this.formReset)
    }
  }
</script>

<style scoped>

</style>
