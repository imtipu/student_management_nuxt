<style scoped lang="scss">
  #top-bar{
    //width: 100%;
    margin-left: 20vw;
    min-width: 100vw;
    position: absolute !important;
    top: 0;
  }
</style>
<template>

</template>



<script>
  export default {
    name: "TopBar",
    props: ['sidebar'],
    data() {
      return {
        isOpen: this.sidebar
      }
    },
    methods: {
      toggleSidebar(){
        // this.$root.$emit('NavLeftDrawer').$data.drawer = false
        // this.toggleSidebar()
        // if (this.isOpen === true){
        //   this.isOpen = false;
        // } else if (this.isOpen === false){
        //   this.isOpen = true;
        // }
        this.isOpen= !this.isOpen;
        this.$emit('update:sidebar', this.isOpen);
        console.log(this.sidebar);
      }
    }
  }
</script>


