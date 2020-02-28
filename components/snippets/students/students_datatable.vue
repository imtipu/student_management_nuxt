<template>
  <div class="datatable-custom">
    <v-list-item class="card-header">
      <v-list-item-content>
        Total: {{ json_data.count }}
      </v-list-item-content>
      <v-list-item-content>
        <form class="ml-auto float-right" @submit="searchPost" style="max-width: 300px">
          <v-text-field
            label="Serach"
            icon
            read-only
            solo
            dense

            v-model="search" @keyup="searchPost"
          ></v-text-field>

        </form>

      </v-list-item-content>


    </v-list-item>
    <div class="card-body">
      <div class="pagination"
           v-if="json_data.total_pages > 1"
      >
        <ul class="" style="max-width: 500px; width: 100%">
          <li class="page-item" :class="{ 'disabled' : json_data.previous === null}"
              v-bind:style="[json_data.previous === null ? {'display': 'none' } : {}]">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   :icon="true"
                   class="grey darken-4 white--text"
                   @click="previousPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </li>
          <li class="page-item" v-if="(json_data.current_page - 3) >= 1">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"

                   @click="goToPage(json_data.current_page - 3)">{{
              json_data.current_page - 3 }}
            </v-btn>
          </li>
          <li class="page-item" v-if="(json_data.current_page - 2) >= 1">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"

                   @click="goToPage(json_data.current_page - 2)">{{
              json_data.current_page - 2 }}
            </v-btn>
          </li>
          <li class="page-item" v-if="(json_data.current_page - 1) >= 1">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"

                   @click="goToPage(json_data.current_page - 1)">{{ json_data.current_page - 1 }}
            </v-btn>
          </li>
          <!--current page-->
          <li class="page-item active" v-if="json_data.current_page">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   class="grey darken-4 white--text
">{{ json_data.current_page }}
            </v-btn>
          </li>

          <li class="page-item active" v-if="json_data.current_page === ''">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   class="grey darken-4 white--text
">1
            </v-btn>
          </li>

          <!--Next 3 pages-->
          <li class="page-item" v-if="(json_data.current_page + 1) <= json_data.total_pages &&
                    json_data.current_page !== ''">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   @click="goToPage(json_data.current_page + 1)">{{
              json_data.current_page + 1 }}
            </v-btn>
          </li>
          <li class="page-item" v-if="(json_data.current_page + 2) <= json_data.total_pages">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   @click="goToPage(json_data.current_page + 2)">{{
              json_data.current_page + 2 }}
            </v-btn>
          </li>
          <li class="page-item" v-if="(json_data.current_page + 3) <= json_data.total_pages">
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   @click="goToPage(json_data.current_page + 3)">{{
              json_data.current_page + 3 }}
            </v-btn>
          </li>

          <li class="page-item" :class="{ 'disabled' : json_data.next === null}"
              v-bind:style="[json_data.next === null ? {'display': 'none' } : {}]"
          >
            <v-btn rounded small
                   :min-height="btnMinHeight"
                   :min-width="btnMinWidth"
                   :icon="true"
                   class="grey darken-4 white--text"
                   @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </li>
        </ul>
      </div>

      <v-simple-table
        fixed-header
      >
        <template>
          <thead>
          <tr v-if="columns.length > 0">
            <th class="text-left" v-for="column in columns" @click="sortingField(column.field)">{{ column
              .header }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in json_data.results" :key="item.id">
            <td v-for="column in columns" v-bind:style="[column.field === 'id' ? { 'width': '1%'} : {}]">
              <div v-if="column.field !== null">
                <span v-if="column.type === 'datetime'">{{ item[column.field] | moment("calendar") }}</span>
                <span v-else-if="column.type === 'boolean'">
                            <span v-if="item[column.field] === true" v-html="column.boolean_true_header"></span>
                            <span v-else v-html="column.boolean_false_header"></span>
                        </span>
                <span v-else>{{ item[column.field] }}</span>
              </div>
              <div v-else>
                <ul v-if="column.type === 'action'" class="list-unstyled list-inline m-auto">
                  <li v-for="action in column.actions" class="list-inline d-inline-block float-left">
                    <a v-if="action === 'view'" @click="viewItem(item.slug)" class="mr-1">
                      <button class="btn btn-sm btn-dark">view</button>
                    </a>
                    <a v-else-if="action === 'edit'" @click="editItem(item.slug)" class="mr-1">
                      <button class="btn btn-sm btn-secondary">edit</button>
                    </a>
                    <a v-else-if="action === 'delete'" @click="deleteItemModal(item.slug)">
                      <button class="btn btn-sm btn-danger">delete</button>
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>

    </div>
    <!--<datatable-view-modal-->
    <!--:url="main_url+modal_data.slug+'/'"-->
    <!--:update="getUrlData"-->
    <!--:modal_data="modal_data"-->
    <!--:modal_show="modal_show"-->

    <!--:modal_type="modal_type"></datatable-view-modal>-->
  </div>
</template>

<script>
  export default {
    name: "students_datatable",
    // components: {DatatableViewModal},
    props: [
      'url',
      'columns',
    ],

    data() {
      return {
        main_url: this.url,
        api_url: this.url,
        descending: true,
        ordering: '',
        search: '',
        modal_data: '',
        modal_type: '',
        modal_show: false,
        json_data: [],
        btnMinHeight: '35',
        btnMinWidth: '35',
        btnHeight: '35',

      }
    },
    methods: {
      modalStatus() {
        this.modal_show = false;
        this.modal_data = [];
        document.getElementsByTagName('body')[0].classList.remove("modal-open")
      },
      async getData() {
        this.modalStatus();
        await this.$axios.get(this.main_url)
          .then(res => {
            this.json_data = res.data;
            this.current_page = res.data.current_page;
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async sortingField(field) {
        this.modalStatus();
        if (this.descending === true) {
          this.ordering = '-' + field;

          this.descending = false
        } else if (this.descending === false) {

          this.ordering = field;
          this.descending = true
        }
        if (this.search !== '') {
          this.api_url =
            this.main_url + '?search=' + this.search + '&ordering=' + this.ordering
        } else {
          this.api_url = this.main_url + '?ordering=' + this.ordering
        }

        await this.$axios.get(this.api_url)
          .then(res => {
            this.json_data = res.data;
            this.current_page = res.data.current_page;
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async searchPost(event) {
        event.preventDefault();
        this.modalStatus();
        if (this.search !== '') {
          if (this.ordering !== '') {
            this.api_url = this.main_url + '?search=' + this.search + '&ordering=' +
              this.ordering
          } else {
            this.api_url = this.main_url + '?search=' + this.search
          }

          await this.$axios.get(this.api_url)
            .then(res => {
              this.json_data = res.data;
              this.current_page = res.data.current_page;
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          await this.$axios.get(this.main_url)
            .then(res => {
              this.json_data = res.data;
              this.current_page = res.data.current_page;
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        }

      },
      async nextPage(event) {
        event.preventDefault();
        this.modalStatus();
        await this.$axios.get(this.json_data.next)
          .then(res => {
            this.json_data = res.data;
            this.current_page = res.data.current_page;
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async previousPage(event) {
        event.preventDefault();
        this.modalStatus();
        await this.$axios.get(this.json_data.previous)
          .then(res => {
            this.json_data = res.data;
            this.current_page = res.data.current_page;
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async goToPage(page) {
        console.log(page);
        this.modalStatus();
        if (this.search !== '') {
          if (this.ordering !== '') {
            this.api_url = this.main_url + '?search=' + this.search + '&ordering=' +
              this.ordering + '&page=' + page
          } else {
            this.api_url = this.main_url + '/?search=' + this.search + '&page=' + page
          }
          await this.$axios.get(this.api_url)
            .then(res => {
              this.json_data = res.data;
              this.current_page = res.data.current_page;
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        }
        else {
          await this.$axios.get(this.main_url + '?page=' + page)
            .then(res => {
              this.json_data = res.data;
              this.current_page = res.data.current_page;
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        }

      },
      async viewItem(item) {
        await this.$axios.get(this.main_url + item + '/')
          .then(res => {
            this.modal_data = res.data;
            this.modal_show = true;
            this.modal_type = 'view';
            document.getElementsByTagName('body')[0].classList.add("modal-open");

            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async editItem(item) {
        await this.$axios.get(this.main_url + item + '/')
          .then(res => {
            this.modal_data = res.data;
            this.modal_show = true;
            this.modal_type = 'edit';
            document.getElementsByTagName('body')[0].classList.add("modal-open");

            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async deleteItemModal(item) {
        await this.$axios.get(this.main_url + item + '/')
          .then(res => {
            this.modal_data = res.data;
            this.modal_show = true;
            this.modal_type = 'delete';
            document.getElementsByTagName('body')[0].classList.add("modal-open")

            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async getUrlData() {
        // this.modalStatus()
        this.modal_show = false;
        this.modal_data = [];
        document.getElementsByTagName('body')[0].classList.remove("modal-open")
        await this.$axios.get(this.json_data.current_url)
          .then(res => {
            this.json_data = res.data;
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      closeModal(event) {
        event.preventDefault();
        this.modal_show = false;
        this.modal_data = [];
        document.getElementsByTagName('body')[0].classList.remove("modal-open")
      },
      // deleteItemConfirm(url){
      //     // event.preventDefault()
      //     this.$axios.delete(url)
      //         .then(res => {
      //             this.getUrlData()
      //             this.closeModal()
      //
      //             console.log(res)
      //         })
      //     // this.update()
      //     // this.update()
      //     // this.modal_show = false
      //     // this.modal_data = []
      //     // document.getElementsByTagName('body')[0].classList.remove("modal-open")
      // }

    },
    mounted() {
      this.getData();
      // this.modalStatus()
    }
  }
</script>

<style scoped lang="scss">
  .pagination {
    width: 100%;
    display: inline-block;
    margin: auto;
    text-align: right;
    ul {
      list-style: none;
      padding: 0;
      float: right;
      right: 0;
      li {
        list-style: none;
        display: inline-block;
        float: left;
        margin-right: 5px;
      }
      li:last-child {
        margin-right: 0;
      }
      li.active {
        color: #fff !important;
      }
    }
  }
</style>
