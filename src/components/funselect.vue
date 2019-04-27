<template>
  <f7-page>
<f7-block>
  <f7-row>
    <f7-col>
      <!-- <f7-button fill href="/homeinfoinput/">家长信息补录</f7-button> -->
      <f7-button fill href="/graduateinput/">更新毕业生信息</f7-button>
    </f7-col>
  </f7-row>
</f7-block>
  </f7-page>

</template>

<script>
import wx from 'weixin-js-sdk';
import axios from 'axios';
import sitecfg from '@/cfg/sitecfg.js';
wx.ready(function(){
  wx.hideAllNonBaseMenuItem()
})

export default {
  data() {
    return {
    };
  },
  mounted(){
    document.getElementById("beginloading").style.display = "none";
    this.wxcofing();
  },
  methods:{
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
