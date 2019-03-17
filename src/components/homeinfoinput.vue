<template>
  <f7-page>
    <f7-card class="demo-facebook-card" v-if="page1show">
      <f7-card-header class="no-border">填表说明</f7-card-header>
      <f7-card-content>
        <p
          style="text-indent:2em"
        >根据国家个税改革相关要求，为配合《个人所得税专项附加扣除暂行办法》实施，支撑子女教育、继续教育专项附加扣除政策落地，按《教育部办公厅 公安部办公厅 财政部办公厅 国家税务总局办公厅关于配合个人所得税专项附加扣除完善教育管理信息系统数据信息的紧急通知》要求，现需要对我校学生及家庭信息进行核查，请家长补录家庭成员信息，因拒绝提供或提供虚假、错误信息而引起的纠纷由家长自行承担。</p>
        <p
          style="text-indent:2em;color:red"
        >必须填写两名家庭成员，一般填写学生的父母亲（即监护人），如只有一名监护人的，可以填写关系列表中允许的成员。家庭成员身份证类型是港澳台的，请联系班主任填写。</p>
        <p style="text-indent:2em">1.姓名：填写身份证件（户籍薄）上姓名。</p>
        <p style="text-indent:2em">2.关系：父亲/母亲/祖父母或外祖父母/兄弟姐妹/其他。(父母亲包括亲生父母、养父母、继父母)</p>
        <p style="text-indent:2em">3.是否监护人:是/否。</p>
        <p style="text-indent:2em">4.身份证件类型：居民身份证/香港（澳门）特区护照/台湾居民来往大陆通行证/境外永久居住证/护照/其他。</p>
        <p style="text-indent:2em">5.身份证件号：18位身份证号或证件号。</p>
      </f7-card-content>
      <f7-card-footer>
        <f7-button fill color="green" @click="gotopage2">我已知晓，开始录入</f7-button>
      </f7-card-footer>
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
        <form id="myform">
          <f7-list no-hairlines-md>
            <f7-list-input
              name="fname"
              id="fname"
              outline
              label="成员1姓名"
              floating-label
              type="text"
              placeholder="成员1姓名"
              clear-button
              required
              validate
            ></f7-list-input>
            <f7-list-item title="成员1与孩子的关系" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="frelation">
                <option value="父亲" selected>父亲</option>
                <option value="母亲">母亲</option>
                <option value="祖父母或外祖父母">祖父母或外祖父母</option>
                <option value="兄弟姐妹">兄弟姐妹</option>
                <option value="其他">其他</option>
              </select>
            </f7-list-item>
            <f7-list-item title="成员1是否监护人" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="fguradian">
                <option value="是" selected>是</option>
                <option value="否">否</option>
              </select>
            </f7-list-item>

            <f7-list-item title="成员1证件类型" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="fpidtype">
                <option value="居民身份证" selected>居民身份证</option>
                <option value="香港特区护照/身份证明">香港特区护照/身份证明</option>
                <option value="台湾居民来往大陆通行证">台湾居民来往大陆通行证</option>
              </select>
            </f7-list-item>
            <f7-list-input
              name="fpid"
              outline
              label="成员1身份证件号"
              floating-label
              type="text"
              placeholder="成员1身份证件号"
              clear-button
              required
              validate
              pattern="[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]"
              data-error-message="请输入正确的身份证号码"
            ></f7-list-input>

            <f7-list-input
              name="sname"
              outline
              label="成员2姓名"
              floating-label
              type="text"
              placeholder="成员2姓名"
              clear-button
              required
              validate
            ></f7-list-input>
            <f7-list-item title="成员2与孩子的关系" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="srelation">
                <option value="父亲">父亲</option>
                <option value="母亲" selected>母亲</option>
                <option value="祖父母或外祖父母">祖父母或外祖父母</option>
                <option value="兄弟姐妹">兄弟姐妹</option>
                <option value="其他">其他</option>
              </select>
            </f7-list-item>
            <f7-list-item title="成员2是否监护人" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="sguradian">
                <option value="是" selected>是</option>
                <option value="否">否</option>
              </select>
            </f7-list-item>

            <f7-list-item title="成员2证件类型" smart-select :smart-select-params="{openIn: 'sheet'}">
              <select name="spidtype">
                <option value="居民身份证" selected>居民身份证</option>
                <option value="香港特区护照/身份证明">香港特区护照/身份证明</option>
                <option value="台湾居民来往大陆通行证">台湾居民来往大陆通行证</option>
              </select>
            </f7-list-item>
            <f7-list-input
              name="spid"
              outline
              label="成员2身份证件号"
              floating-label
              type="text"
              placeholder="成员2身份证件号"
              clear-button
              validate
              required
              pattern="[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]"
              data-error-message="请输入正确的身份证号码"
            ></f7-list-input>
          </f7-list>
        </form>
      </f7-card-content>
      <f7-card-footer class="no-border">
        <f7-button fill color="green" @click="save">保存</f7-button>
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
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      page1show: true,
      page2show: false,
      sheetOpened: false,
      loading: false,
      dialogclosetype: 0,//0：不做任何操作;1:关闭当前页面
      dialoginfo: {
        show: false,
        title: "",
        message: "",
        cb: 0
      },
      stuinfo: {
        stuname: "",
        stuclass: "",
        stuid: ""
      }
    };
  },
  components: {
    loadingdialog
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
  },
  watch: {
    page2show: function(val, oldval) {
      if (!val) return;
      this.getbaseinfo();
    }
  },
  methods: {
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
        let res = await axios.get("/homeinfo/getbaseinfo/", {
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
        this.stuinfo.stuclass = res.data.result.班级名称;
        this.stuinfo.stuid = res.data.result.全国学籍号;
        forminfo.fname = res.data.result.成员1姓名;
        forminfo.frelation = res.data.result.成员1关系;
        forminfo.fguradian = res.data.result.成员1是否监护人;
        forminfo.fpidtype =
          res.data.result.成员1身份证件类型 == "其他"
            ? "居民身份证"
            : res.data.result.成员1身份证件类型;
        forminfo.fpid = res.data.result.成员1身份证件号;

        forminfo.sname = res.data.result.成员2姓名;
        forminfo.srelation = res.data.result.成员2关系;
        forminfo.sguradian = res.data.result.成员2是否监护人;
        forminfo.spidtype =
          res.data.result.成员2身份证件类型 == "其他"
            ? "居民身份证"
            : res.data.result.成员2身份证件类型;
        forminfo.spid = res.data.result.成员2身份证件号;

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

