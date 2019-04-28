<template></template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  data() {
    return{}
  },
  //props: ["loading","dialoginfo"],
  computed:{
    ...mapState({
      loading:'showPreloader',
      dialoginfo:'dialog',
    })
  },
  watch: {
    loading: function(val, oldval) {
      if (val) this.showloading(true);
      else this.showloading(false);
    },
    'dialoginfo.show': function(val, oldval) {
      if (!val) return;
      this.dialogshow();
      this.dialoginfo.show = false;
    }
  },


  methods: {
    showloading(val) {
      if (val) this.$f7.preloader.show("green");
      else this.$f7.preloader.hide();
    },
    dialogshow() {
      let self=this
      this.$f7.dialog.alert(this.dialoginfo.message, this.dialoginfo.title,function(){
        self.$emit("dialogclose")
      });
    }
  }
};
</script>
