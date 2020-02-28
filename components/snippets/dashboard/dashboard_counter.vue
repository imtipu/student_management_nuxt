<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-container class="">
        <v-row
          class="mb-6"
          no-gutters
        >
          <v-col>
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                  <v-card-text>

                  </v-card-text>
                </v-list-item-content>

              </v-list-item>

              <v-card-actions>
                <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-flex>
  </v-layout>

</template>

<script>
  export default {
    middleware: ['auth'],
    props: ['user'],
    name: "dashboard_counter"
  }
</script>

<style scoped>

</style>
