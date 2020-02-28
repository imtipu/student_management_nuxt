<template>
  <div>
    <dashboard_counter></dashboard_counter>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Dashboard_counter from "../components/snippets/dashboard/dashboard_counter";

export default {
  middleware: ['auth'],
  components: {
    Dashboard_counter,
    Logo,
    VuetifyLogo
  },
  head(){
    return{
      title: 'Dashboard'
    }
  },
  data(){
    return{

    }
  }
}
</script>
