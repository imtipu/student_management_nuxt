<template>
  <div class="card page">
    <b-card-body title="Classes">
      <custom_datatable :url="url" :columns="columns" v-if="this.$auth.user.is_superuser === true"/>
      <div class="alert alert-warning" v-else>
        You don't have any permission to view this section.
      </div>
    </b-card-body>

  </div>
</template>

<script>
  import Custom_datatable from "../../components/snippets/custom_datatable";
  export default {
    name: "index",
    components: {Custom_datatable},
    head(){
      return{
        title: 'Classes',
      }
    },
    data() {
      return {
        url: process.env.API_URL + '/classes/',
        columns: [
          {
            header: 'ID',
            field: 'id',
            type: 'string'
          },
          {
            header: 'Title',
            field: 'title',
            type: 'string'
          },
          // {
          //   header: 'Status',
          //   field: 'is_published',
          //   type: 'boolean',
          //   boolean_true_header: '<span class="badge badge-success">Published</span>',
          //   boolean_false_header: '<span class="badge badge-warning">Unpublished</span>',
          // },
          // {
          //   header: 'Action',
          //   field: null,
          //   type: 'action',
          //   actions: [
          //     'view',
          //     'edit',
          //     'delete'
          //   ]
          // },
          {
            header: 'Created',
            field: 'created',
            type: 'datetime'
          },
        ]
      }
    },
    methods: {

    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>
