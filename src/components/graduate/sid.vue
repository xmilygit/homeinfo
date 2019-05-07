<template>
  <f7-card class="demo-facebook-card">
    <f7-card-header class="no-border">
      <div class="demo-facebook-avatar">
        <!-- <i class="f7-icons" style="font-size:50px;">person</i> -->
        <img src="../../assets/face.png" width="50px">
      </div>
      <div class="demo-facebook-name">{{stuinfo.stuname}}</div>
      <div class="demo-facebook-date">{{stuinfo.stuclass}}</div>
    </f7-card-header>
    <f7-card-content :padding="false">
      <f7-block>
      <p>学籍号：{{stuinfo.stuid}}</p>
      </f7-block>
    </f7-card-content>
  </f7-card>
</template>

<script>
import loadingdialog from "@/components/loadingdialog.vue";

import wx from "weixin-js-sdk";
import { mapState, mapMutations, mapActions } from "vuex";
wx.ready(function(){
  wx.hideAllNonBaseMenuItem()
})

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState("graduate", {
      stuinfo: "graduateinfo",
    })
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
    this.wxcofing();
    this.getGraduateInfo();
  },
  methods: {
    ...mapActions("graduate", [
      "getGraduateInfo",
    ]),
    async wxcofing(){
      let cfgdata={
        debug:sitecfg.wxdebug,
        url:location.href.split('#')[0],
        jsApiList:['hideAllNonBaseMenuItem','closeWindow']
      }
      try{
        let res=await axios.post('/wechatforsvr/jsconfig/',{cfgdata:cfgdata})
        wx.config(res.data.jsconfig)
      }catch(err){
        alert(err)
      }
    }
  }
};
</script>