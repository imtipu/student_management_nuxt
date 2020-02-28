<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline" color="primary">Classes</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content v-if="this.$auth.user.is_superuser === true">
        <custom_datatable :url="url" :columns="columns"/>
      </v-list-item-content>
      <v-alert v-else
               border="right"
               colored-border
               type="error"
               elevation="2"
      >
        You don't have any permission to view this section.
      </v-alert>
    </v-list-item>

  </v-card>
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
