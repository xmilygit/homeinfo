<template>
  <f7-page>
    <f7-card class="demo-facebook-card" v-if="page1show">
      <f7-card-header class="no-border">
        <div class="demo-facebook-avatar">
          <!-- <i class="f7-icons" style="font-size:50px;">person</i> -->
          <img src="../assets/face.png" width="50px"/>
        </div>
        <div class="demo-facebook-name">{{stuinfo.stuname}}</div>
        <div class="demo-facebook-date">{{stuinfo.stuclass}}</div>
        <div class="demo-facebook-date">学籍号：{{stuinfo.stuid}}</div>
      </f7-card-header>
      <f7-card-content   style="font-size:16px" >
        <p>学生身份证号：{{stuinfo.stupid}}</p>
        <p>性别：{{stuinfo.gender}}</p>
        <p>出生日期：{{stuinfo.born}}</p>
        <f7-list no-hairlines-md>
          <f7-list-item title="民族" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="ethnic">
                <option v-for="item in ethniclist" :key="item.id" value="item.ethnic">{{item.ethnic}}</option>
              </select>
            </f7-list-item>
        </f7-list>
        <p>
        <f7-button fill color="green" @click="gotopage2">已确认学生信息，下一步</f7-button>
        </p>
        <f7-button fill color="red" @click="stuinfoerror">学生信息有误</f7-button>
      </f7-card-content>
    </f7-card>

    <f7-card class="demo-facebook-card" v-if="page2show">
      <f7-card-header class="no-border">
        <div class="demo-facebook-avatar">
          <!-- <i class="f7-icons" style="font-size:50px;">person</i> -->
          <img src="../assets/face.png" width="50px"/>
        </div>
        <div class="demo-facebook-name">{{stuinfo.stuname}}</div>
        <div class="demo-facebook-date">{{stuinfo.stuclass}}</div>
        <div class="demo-facebook-date">学籍号：{{stuinfo.stuid}}</div>
      </f7-card-header>
      <f7-card-content :padding="false">
        <form id="guradianform">
          <f7-list no-hairlines-md>
            <f7-list-input
              name="fname"
              id="fname"
              outline
              label="监护人1姓名"
              floating-label
              type="text"
              placeholder="监护人1姓名"
              clear-button
              required
              validate
            ></f7-list-input>
            <f7-list-item title="监护人1与学生的关系" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="frelation">
                <option value="父亲" selected>父亲</option>
                <option value="母亲">母亲</option>
                <option value="祖父母或外祖父母">祖父母或外祖父母</option>
                <option value="兄弟姐妹">兄弟姐妹</option>
                <option value="其他">其他</option>
              </select>
            </f7-list-item>
            <f7-list-input
              name="sname"
              outline
              label="监护人2姓名"
              floating-label
              type="text"
              placeholder="监护人2姓名"
              clear-button
              validate
            ></f7-list-input>
            <f7-list-item title="监护人2与学生的关系" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="srelation">
                <option value="父亲">父亲</option>
                <option value="母亲" selected>母亲</option>
                <option value="祖父母或外祖父母">祖父母或外祖父母</option>
                <option value="兄弟姐妹">兄弟姐妹</option>
                <option value="其他">其他</option>
              </select>
            </f7-list-item>
          </f7-list>
        </form>
      </f7-card-content>
      <f7-card-footer class="no-border">
        <f7-button fill color="green" @click="save">上一步</f7-button>&nbsp;&nbsp;
        <f7-button fill color="green" @click="save">下一步</f7-button>
      </f7-card-footer>
    </f7-card>

    <f7-fab position="right-top" slot="fixed" color="yellow" @click="openhelp" v-if="page2show">
      <!-- <f7-icon ios="f7:help_round" md="material:help_round"></f7-icon>
      <f7-icon ios="f7:help_round" md="material:help_round"></f7-icon>-->
      说明
    </f7-fab>

    <f7-sheet class="demo-sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left">填表说明</div>
        <div class="right">
          <f7-link sheet-close>关闭</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <p
          style="text-indent:2em;color:red"
        >必须填写两名家庭成员，一般填写学生的父母亲（即监护人），如只有一名监护人的，可以填写关系列表中允许的成员。家庭成员身份证类型是港澳台的，请联系班主任填写。</p>
        <p style="text-indent:2em">1.姓名：填写身份证件（户籍薄）上姓名。</p>
        <p style="text-indent:2em">2.关系：父亲/母亲/祖父母或外祖父母/兄弟姐妹/其他。(父母亲包括亲生父母、养父母、继父母)</p>
        <p style="text-indent:2em">3.是否监护人:是/否。</p>
        <p style="text-indent:2em">4.身份证件类型：居民身份证/香港（澳门）特区护照/台湾居民来往大陆通行证/境外永久居住证/护照/其他。</p>
        <p style="text-indent:2em">5.身份证件号：18位身份证号或证件号。</p>
      </f7-page-content>
    </f7-sheet>
    <loadingdialog :loading="loading" :dialoginfo="dialoginfo" @dialogclose="dialogclose"></loadingdialog>
  </f7-page>
</template>


<script>
import axios from "axios";
import loadingdialog from "@/components/loadingdialog.vue";
import ethnic from '@/cfg/ethnic.json';
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      stuinfo: {
        stuname: "",
        stuclass: "",
        stuid: ""
      },
      ethniclist:ethnic,
      page2show: false,



      page1show: true,
      
      sheetOpened: false,
      loading: false,
      dialogclosetype: 0,//0：不做任何操作;1:关闭当前页面
      dialoginfo: {
        show: false,
        title: "",
        message: "",
        cb: 0
      },      
    };
  },
  components: {
    loadingdialog
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
    this.getbaseinfo();
  },
  watch: {
    page2show: function(val, oldval) {
      if (!val) return;
      this.getbaseinfo();
    }
  },
  methods: {
    stuinfoerror(){

    },
    dialogclose() {
      switch (this.dialogclosetype) {
        case 1:
          this.closewindow();
          break;
      }
    },
    closewindow() {
      wx.closeWindow();
    },
    async getbaseinfo() {
      this.loading = true;
      let forminfo = {};

      try {
        let res = await axios.get("/graduate/getbaseinfo/", {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        });
        this.loading=false;
        if(res.data.error){
          this.dialogclosetype=1;
          this.dialoginfo={
            show:true,
            title:'错误',
            message:res.data.message
          }
          return
        }
        // alert(res.data.result.成员2是否监护人);
        this.stuinfo.stuname = res.data.result.学生姓名;
        this.stuinfo.stuclass = res.data.result.班级;
        this.stuinfo.stuid = res.data.result.学籍号;
        this.stuinfo.stupid=res.data.result.身份证件号;
        this.stuinfo.gender=res.data.result.性别;
        this.stuinfo.ethnic=res.data.result.民族;
        this.stuinfo.born=this.stuinfo.stupid.substring(6,14);
        forminfo.fname = res.data.result.成员1姓名;
        forminfo.frelation = res.data.result.成员1与学生关系;
        //forminfo.fguradian = res.data.result.成员1是否监护人;
        // forminfo.fpidtype =
        //   res.data.result.成员1身份证件类型 == "其他"
        //     ? "居民身份证"
        //     : res.data.result.成员1身份证件类型;
        // forminfo.fpid = res.data.result.成员1身份证件号;

        forminfo.sname = res.data.result.成员2姓名;
        forminfo.srelation = res.data.result.成员2与学生关系;
        // forminfo.sguradian = res.data.result.成员2是否监护人;
        // forminfo.spidtype =
        //   res.data.result.成员2身份证件类型 == "其他"
        //     ? "居民身份证"
        //     : res.data.result.成员2身份证件类型;
        // forminfo.spid = res.data.result.成员2身份证件号;

        this.$f7.form.fillFromData("#myform", forminfo);
        this.loading = false;
        // alert(this.$f7.form.convertToData("#myform"));
      } catch (err) {
        this.loading = false;
        switch (err) {
          case "关键数据链接失效或者是非法的！":
            this.dialogclosetype = 1;
            break;
          default:
            this.dialogclosetype=0;
            break;
        }
        this.dialoginfo = {
          show: true,
          title: "出错了",
          message: err
        };
      }
    },
    gotopage2() {
      this.page1show = false;
      this.page2show = true;
    },
    openhelp() {
      this.sheetOpened = true;
    },
    async save() {
      if (!document.forms["myform"].reportValidity()) return;
      this.loading = true;
      let forminfo = this.$f7.form.convertToData("#myform");
      try {
        let res = await axios.post(
          "/homeinfo/savehomeinfo/",
          { homeinfo: forminfo },
          {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          }
        );
        this.loading = false;
        this.dialogclosetype=1;
        this.dialoginfo = {
          show: true,
          title: "提示",
          message: "保存成功!确定后页面将关闭！"
        };
      } catch (err) {
        this.loading = false;
        switch (err) {
          case "关键数据链接失效或者是非法的！":
            this.dialogclosetype = 1;
            break;
          default:
            this.dialogclosetype=0;
            break;
        }
        this.dialoginfo = {
          show: true,
          title: "出错了",
          message: "保存失败:[" + err + "]"
        };
      }
    }
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

