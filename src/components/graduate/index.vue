<template>
  <f7-page>
    <page1 :stuinfo="stuinfo" v-if="page1show" @nextpage="next"></page1>
    <page2 :stuinfo="stuinfo" v-if="page2show" @nextpage="next" @prepage="pre"></page2>
    <page3 :stuinfo="stuinfo" v-if="page3show" @prepage="pre"></page3>
    <!-- <loadingdialog :loading="loading" :dialoginfo="dialoginfo" @dialogclose="dialogclose"></loadingdialog> -->
    <loadingdialog></loadingdialog>
  </f7-page>
</template>

<script>
import page1 from "@/components/graduate/page1.vue";
import page2 from "@/components/graduate/page2.vue";
import page3 from "@/components/graduate/page3.vue";
import loadingdialog from "@/components/loadingdialog.vue";
// import axios from "axios";
import {mapState,mapMutations,mapActions} from "vuex";

export default {
  data() {
    return {
      page1show: false,
      page2show:false,
      page3show:false,
    };
  },
  components: {
    page1,
    page2,
    page3,
    loadingdialog
  },
  computed:{
    ...mapState('graduate',{
      stuinfo:'graduateinfo'
    })
  },
  watch:{
    stuinfo:function(val,oldval){
      this.page1show=true;
    }
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
    this.getGraduateInfo();
  },
  methods: {
    ...mapActions('graduate',['getGraduateInfo']),
    dialogclose() {
      switch (this.dialogclosetype) {
        case 1:
          this.closewindow();
          break;
      }
    },
    pre(pageno,formdata){
      switch(pageno){
        case 2:
        this.page1show=true;
        this.page2show=false;
        break;
        case 3:
        this.page3show=false;
        this.page2show=true;
        break;
      }
    },
    next(pageno,formdata) {
      switch(pageno){
        case 1:
        this.page1show=false;
        this.page2show=true;
        break;
        case 2:
        this.page2show=false;
        this.page3show=true;        
        break;
      }
    },
  }
};
</script>


<style>
.demo-facebook-card .card-header {
  display: block;
  padding: 10px;
}
.demo-facebook-card .demo-facebook-avatar {
  float: left;
  width: 65px;
}
.demo-facebook-card .demo-facebook-name {
  margin-left: 44px;
  font-size: 14px;
  font-weight: 500;
}
.demo-facebook-card .demo-facebook-date {
  margin-left: 44px;
  font-size: 13px;
  color: #8e8e93;
}
.demo-facebook-card .card-footer {
  background: #fafafa;
}
.demo-facebook-card .card-footer a {
  color: #81848b;
  font-weight: 500;
  width: 100%;
  color: #fafafa;
}
.demo-facebook-card .card-content img {
  display: block;
}
.demo-facebook-card .card-content-padding {
  padding: 15px 10px;
}
.demo-facebook-card .card-content-padding .likes {
  color: #8e8e93;
}
</style>