export default {
  methods: {
    toggleSidebar: function(){
      if (this.drawer === true){
        this.drawer = false;
      } else if (this.drawer === false){
        this.drawer = true;
      }
    }
  }
}
