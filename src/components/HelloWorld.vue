<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>教务管理</f7-nav-title>
    </f7-navbar>
    <f7-block-title>Fill Buttons</f7-block-title>
<f7-block>
  <f7-row>
    <f7-col>
      <f7-button fill>Button</f7-button>
    </f7-col>
    <f7-col>
      <f7-button fill>Button</f7-button>
    </f7-col>
    <f7-col>
      <f7-button fill round>Round</f7-button>
    </f7-col>
  </f7-row>
</f7-block>
{{openid}}
  </f7-page>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      openid:''
    };
  },
  async beforeCreate(){
    try{
      let res=await axios.get('http://mxthink.cross.echosite.cn/wechat/cgetopenid');
      alert(res.data.openid)
    }catch(err){
      alert(err)
      console.log(err)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
</style>
