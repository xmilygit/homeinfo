<template>
  <f7-page>
    <div>
      <f7-block-title>请绑定学生帐号</f7-block-title>
      <f7-list no-hairlines-md>
        <f7-list-input
          outline
          label="学生姓名"
          floating-label
          type="text"
          placeholder="学生姓名"
          clear-button
          :value="forminfo.stuname"
          @input="forminfo.stuname=$event.target.value"
        ></f7-list-input>

        <f7-list-input
          outline
          label="密码"
          floating-label
          type="password"
          placeholder="学生的身份证后6位"
          clear-button
          :value="forminfo.stupassword"
          @input="forminfo.stupassword=$event.target.value"
        ></f7-list-input>
      </f7-list>
      <f7-block>
        <f7-button fill @click="binder">绑定</f7-button>
        <!-- <f7-button fill @click="eveloading">loading</f7-button>
        <f7-button fill @click="evedialog">dialog</f7-button>-->
      </f7-block>
    </div>
    <loadingdialog :loading="loading" :dialoginfo="dialoginfo" @dialogclose="dialogclose"></loadingdialog>
  </f7-page>
</template>

<script>
import wx from "weixin-js-sdk";
import axios from "axios";
import loadingdialog from "@/components/loadingdialog.vue";
import sitecfg from "@/cfg/sitecfg.js";

wx.ready(function() {
  wx.hideAllNonBaseMenuItem();
});
export default {
  data() {
    return {
      dialoginfo: {
        show: false,
        title: "",
        message: ""
      },
      dialogclosetype: 0,//0:不执行操作;1:关闭窗口；2:跳转指定页面
      loading: false,
      isbinder: false,
      forminfo: {
        stuname: "",
        stupassword: ""
      }
    };
  },
  components: {
    loadingdialog
  },
  watch: {},

  async mounted() {
    //alert(sessionStorage.getItem('token'))
    this.hiddebeginloading();
    this.wxcofing();
  },

  methods: {
    dialogclose() {
      switch (this.dialogclosetype) {
        case 1:
          this.closewindow();
          break;
        case 2:
          this.jumptopage();
          break;
      }
    },
    closewindow() {
      wx.closeWindow();
    },
    async wxcofing() {
      let cfgdata = {
        debug: sitecfg.wxdebug,
        url: location.href.split("#")[0],
        jsApiList: ["hideAllNonBaseMenuItem", "closeWindow"]
      };
      try {
        let res = await axios.post("/wechatforsvr/jsconfig/", { cfgdata: cfgdata });
        wx.config(res.data.jsconfig);
      } catch (err) {
        alert(err);
      }
    },
    //隐藏页面首次加载的loading画面
    hiddebeginloading() {
      document.getElementById("beginloading").style.display = "none";
    },
    //跳转功能选择界面
    jumptopage() {
      if (this.isbinder) this.$f7router.navigate("/funselect/");
    },
    async binder() {
      this.loading = true;
      //this.binderinfo.openid = this.info.openid;
      try {
        let res = await axios.post(
          "/wechatforsvr/binder/",
          { stuinfo: this.forminfo },
          {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          }
        );
        this.loading = false;
        if (res.data.error) {
          this.dialoginfo = {
            show: true,
            message: res.data.message,
            title: "出错了!"
          };
          return;
        }
        sessionStorage.setItem("token", res.data.token);
        this.isbinder = res.data.isbinder;
        this.dialogclosetype=2;
        this.dialoginfo = {
          show: true,
          message: "用户绑定成功!确定后跳转到补录页面。",
          title: "提示"
        };
      } catch (err) {
        this.loading = false;
        switch (err) {
          case "关键数据链接失效或者是非法的！":
            this.dialogclosetype = 1;
            break;
          default:
            this.dialogclosetype = 0;
            break;
        }
        this.dialoginfo = {
          show: true,
          message: err,
          title: "系统错误!"
        };
      }
    }
  }
};
</script>

