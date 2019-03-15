<template>
  <f7-page>
    <f7-navbar title="请绑定学生帐户"></f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        outline
        label="学生姓名"
        floating-label
        type="text"
        placeholder="学生姓名"
        clear-button
        :value="binderinfo.stuname"
        @input="binderinfo.stuname=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        label="密码"
        floating-label
        type="password"
        placeholder="学生的身份证后6位"
        clear-button
        :value="binderinfo.stupassword"
        @input="binderinfo.stupassword=$event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-block>
      <f7-button fill @click="binder">绑定</f7-button>
      <!-- <f7-button fill @click="eveloading">loading</f7-button>
      <f7-button fill @click="evedialog">dialog</f7-button>-->
    </f7-block>
    <loadingdialog :loading="loading" :dialoginfo="dialoginfo"></loadingdialog>
  </f7-page>
</template>

<script>
import axios from "axios";
import loadingdialog from "@/components/loadingdialog.vue";

export default {
  data() {
    return {
      dialoginfo: {
        show: false,
        title: "",
        message: ""
      },
      loading: false,
      info: "",
      binderinfo: {
        stuname: "",
        stupassword: ""
      }
    };
  },
  components: {
    loadingdialog
  },
  async beforeCreate() {
    try {
      let res = await axios.get(
        "http://mxthink.cross.echosite.cn/wechat/cgetopenid/"
      );
      //let res=await axios.get('/wechat/cgetopenid');
      //sessionStorage.setItem("info", res.data.info);
      this.info = JSON.parse(res.data.info);
      if (info.isbinder) {
        this.$f7router.navigate("/funselect/");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  },
  methods: {
    // eveloading(){
    //   this.loading=!this.loading
    // },
    // evedialog(){
    //   this.dialoginfo={
    //     message:'test dialog',
    //     title:'test title',
    //     show:true
    //   }
    // },
    async binder() {
      this.loading=true;
      this.binderinfo.openid = this.info.openid;
      alert(
        this.binderinfo.stuname +
          ":" +
          this.binderinfo.stupassword +
          ":" +
          this.binderinfo.openid
      );
      try {
        let res = await axios.post(
          "http://mxthink.cross.echosite.cn/wechat/binder/",
          { stuinfo: this.binderinfo }
        );
        this.loading=false
        if(res.data.error){
          this.dialoginfo={
            show:true,
            message:res.data.message,
            title:"出错了!"
          }
        }
      } catch (err) {
        this.loading=false
        this.dialoginfo={
            show:true,
            message:err,
            title:"系统错误!"
          }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

