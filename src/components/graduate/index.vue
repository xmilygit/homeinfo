<template>
  <f7-page>
    <start @nextpage="next" v-if="startshow"></start>
    <page1 :stuinfo="stuinfo" v-if="page1show" @nextpage="next"></page1>
    <page2 :stuinfo="stuinfo" v-if="page2show" @nextpage="next" @prepage="pre"></page2>
    <checkhome :stuinfo="stuinfo" v-if="checkhomepageshow" @nextpage="next" @prepage="pre"></checkhome>
    <!-- <fsreg :stuinfo="stuinfo" v-if="fsregshow" :prepage="prepage"></fsreg> -->
    <loadingdialog @dialogclose="dialogclose"></loadingdialog>
    <readme v-show="!startshow"></readme>
  </f7-page>
</template>

<script>
import start from "@/components/graduate/start.vue";
import page1 from "@/components/graduate/page1.vue";
import page2 from "@/components/graduate/page2.vue";
import checkhome from "@/components/graduate/checkhome.vue";
import readme from "@/components/graduate/readme.vue";
import loadingdialog from "@/components/loadingdialog.vue";

import wx from "weixin-js-sdk";
// import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      startshow:true,
      page1show: false,
      page2show: false,
      checkhomepageshow: false,
      // checkhome:false,
      prepage: 0
    };
  },
  components: {
    start,
    page1,
    page2,
    checkhome,
    loadingdialog,
    readme,
  },
  computed: {
    ...mapState("graduate", {
      stuinfo: "graduateinfo",
      dialogclosetype:"dialogclosetype"
    })
  },
  watch: {
    stuinfo: function(val, oldval) {
      // this.page1show = true;
      this.startshow=true;
    }
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
    this.getGraduateInfo();
  },
  methods: {
    ...mapActions("graduate", [
      "getGraduateInfo",
      "modiGraduateInfoAttr",
      "saveGraduateInfo"
    ]),
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
    pre(pageno) {
      switch (pageno) {
        case 2:
          this.page1show = true;
          this.page2show = false;
          break;
        case "checkhome":
          this.page2show = true;
          this.checkhomepageshow = false;
          break;
      }
    },
    next(pageno) {
      switch (pageno) {
        case 0:
          this.page1show=true;
          this.startshow=false;
        break;
        case 1:
          this.page1show = false;
          this.page2show = true;
          break;
        case 2:
          this.page2show = false;
          this.checkhomepageshow = true;
          break;
        case "finished":
          //alert('完成')
          this.saveGraduateInfo(this.stuinfo);
          console.log(this.stuinfo);
          break;
      }
    },
    result() {
      //四城区学校否
      let stulocal = /叠彩|七星|秀峰|象山/gi.test(this.stuinfo.regaddress);

      let stuys = /雁山/gi.test(this.stuinfo.regaddress);
      if (stuys) {
        alert("雁山区户籍，请携带户口本，居住证明单独咨询");
        return;
      }

      //住地是以证名义下的
      let whohouse = "";
      //住地归属别名用于程序识别
      let whohouseAlias = "";
      if (/监护人1/gi.test(this.stuinfo.hometype)) {
        whohouse = this.stuinfo.fname;
        whohouseAlias = 1;
      } else if (/监护人2/gi.test(this.stuinfo.hometype)) {
        whohouse = this.stuinfo.sname;
        whohouseAlias = 2;
      } else if (/祖父母或外祖父母/gi.test(this.stuinfo.hometype)) {
        whohouse = "祖父母(外祖父母)";
        whohouseAlias = 3;
      } else if (/学生/gi.test(this.stuinfo.hometype)) {
        whohouse = this.stuinfo.stuname;
        whohouseAlias = 4;
      } else {
        whohouse = "监护人";
        whohouseAlias = 0;
      }

      let rs = [
        this.stuinfo.stuname + "户口本;",
        whohouse + "名下房产证;",
        whohouse + "与房东签订的租房合同、房东的房产证（或复印件）;",
        "祖父母（外祖父母房产证）;",
        whohouse + "名下集资房购房协议及房款发票;",
        whohouse +
          "与单位签订的租房合同（工资条房租扣款凭证、水、电缴费证明）;",
        whohouse + "名下公租房（租约房）、廉租房证本;",
        whohouse + "与" + this.stuinfo.stuname + "的关系证明（出生证）;",
        whohouse + "与另一监护人的关系证明（结婚证）;",
        "填写无房查询登录表;"
      ];

      let resultText = rs[0];

      //有产权房否
      let hashouse = /监护人共有产权房|监护人1产权房|监护人2产权房|监护人1单位集资房|监护人2单位集资房/gi.test(
        this.stuinfo.hometype
      );
      this.checkhome = hashouse ? false : true;
      if (stulocal) {
        //四城区户籍学生

        if (whohouseAlias == 4) {
          //学生单独产权房产
          alert(rs[0] + rs[1]);
          return;
        }

        if (
          this.stuinfo.fregaddress != 5 &&
          this.stuinfo.fregaddress != 4 &&
          this.stuinfo.sregaddress != 5 &&
          this.stuinfo.sregaddress != 4 &&
          !hashouse
        ) {
          if (whohouseAlias == 3) {
            //只有学生单独四城区户籍且无房，用老人家房子，可认定学生
            alert(rs[0] + rs[1] + rs[9]);
            return;
          }
          //只有学生单独四城区户籍且无房，认定为外来务工人员子女
          alert(rs[0] + "监护人户口本;请带材料咨询");
          return;
        }

        if (
          this.stuinfo.fregaddress != 5 &&
          this.stuinfo.sregaddress != 5 &&
          whohouseAlias !== 3
        ) {
          //监护人与学生均不在同一户籍，需要证明与学生的关系
          resultText += rs[7];
        }

        if (hashouse) {
          //有房
          let temphomeRS = rs[1];
          if (/集资/gi.test(this.stuinfo.hometype)) {
            temphomeRS = rs[4];
          }
          if (
            (this.stuinfo.fregaddress != 5 &&
              whohouseAlias == 1 &&
              this.stuinfo.sregaddress == 5) ||
            (this.stuinfo.sregaddress != 5 &&
              whohouseAlias == 2 &&
              this.stuinfo.fregaddress == 5)
          ) {
            //房产所有人与学生不在同一户籍的
            resultText += temphomeRS + rs[7] + "或者" + rs[8];
            alert(resultText);
            return;
          }
          //房产所有人与学生同户籍
          resultText += temphomeRS;
          // alert(resultText)
        } else {
          //无房
          let temphomeRS = rs[1];
          if (/名义租房/gi.test(this.stuinfo.hometype)) temphomeRS = rs[2];
          else if (/单位房/gi.test(this.stuinfo.hometype)) temphomeRS = rs[5];
          else if (/公租房/gi.test(this.stuinfo.hometype)) temphomeRS = rs[6];

          if (
            (this.stuinfo.fregaddress != 5 &&
              whohouseAlias == 1 &&
              this.stuinfo.sregaddress == 5) ||
            (this.stuinfo.sregaddress != 5 &&
              whohouseAlias == 2 &&
              this.stuinfo.fregaddress == 5)
          ) {
            //住所名下监护人与学生不在同一户籍的
            resultText += temphomeRS + rs[7] + "或者" + rs[8] + rs[9];
            alert(resultText);
            return;
          }
          //住所名下监护人与学生同户籍
          resultText += temphomeRS + rs[9];
        }
        alert(resultText);
      } else {
        //非四城区户籍学生
        //随具有四城区户籍监护人实际居住（有房产的)
        if (
          (this.stuinfo.fregaddress == 4 && hashouse) ||
          (this.stuinfo.sregaddress == 4 && hashouse)
        ) {
          resultText += rs[1];
          if (
            (this.stuinfo.fregaddress != 5 &&
              whohouseAlias == 1 &&
              this.stuinfo.sregaddress == 5) ||
            (this.stuinfo.sregaddress != 5 &&
              whohouseAlias == 2 &&
              this.stuinfo.fregaddress == 5)
          ) {
            resultText += rs[7] + "或者" + rs[8];
          }
        } else {
          resultText = "学生户口本；以外来务工人员子女就读，由初中审核材料";
        }
        alert(resultText);
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