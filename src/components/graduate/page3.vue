<template>
  <f7-card class="demo-facebook-card">
    <f7-card-header class="no-border">
      <div class="demo-facebook-avatar">
        <!-- <i class="f7-icons" style="font-size:50px;">person</i> -->
        <img src="../../assets/face.png" width="50px">
      </div>
      <div class="demo-facebook-name">{{stuinfo.stuname}}</div>
      <div class="demo-facebook-date">{{stuinfo.stuclass}}</div>
      <div class="demo-facebook-date">学籍号：{{stuinfo.stuid}}</div>
    </f7-card-header>
    <f7-card-content :padding="false">
      <f7-block-title>学生与监护人户籍情况选择</f7-block-title>
      <div style="padding:5px 5px 5px 5px">
        <!-- 学生户口本首页地址 -->
        <f7-row>
          <f7-col v-if="!stuinfo.sigle">
            <f7-button
              @click="regtype(1)"
              large
              fill
              color="orange"
            >{{stuinfo.stuname}}与{{stuinfo.fname}}、{{stuinfo.sname}}同户籍</f7-button>
          </f7-col>
        </f7-row>
        <!-- 学生户口本首页地址 -->
        <f7-row style="margin-top:5px;">
          <f7-col>
            <f7-button
              @click="regtype(2)"
              large
              fill
              color="blue"
            >{{stuinfo.stuname}}与{{stuinfo.fname}}同户籍</f7-button>
          </f7-col>
        </f7-row>
        <!-- 学生户口本首页地址 -->
        <f7-row style="margin-top:5px;" v-if="!stuinfo.sigle">
          <f7-col>
            <f7-button
              @click="regtype(3)"
              large
              fill
              color="lightblue"
            >{{stuinfo.stuname}}与{{stuinfo.sname}}同户籍</f7-button>
          </f7-col>
        </f7-row>
        <f7-row style="margin-top:5px;">
          <f7-col>
            <f7-button @click="regtype(4)" large fill color="deeporange">{{stuinfo.stuname}}不与监护人同户籍</f7-button>
          </f7-col>
        </f7-row>
        <f7-row style="margin-top:5px;">
          <f7-col>
            <f7-button large fill color="green" @click="pre">上一步</f7-button>
          </f7-col>
        </f7-row>
      </div>
    </f7-card-content>
  </f7-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["stuinfo"],
  methods: {
    pre() {
      this.$emit("prepage", 3);
    },
    regtype(type) {
      let stulocal = /叠彩区|七星区|秀峰区|象山区/gi.test(
        this.stuinfo.regaddress
      );

      let whohouse = "";
      if (/监护人1/gi.test(this.stuinfo.hometype))
        whohouse = this.stuinfo.fname;
      else if (/监护人2/gi.test(this.stuinfo.hometype))
        whohouse = this.stuinfo.sname;
      else if (/祖父母或外祖父母/gi.test(this.stuinfo.hometype))
        whohouse = "祖父母(外祖父母)";
      else whohouse = "监护人";

      let hashouse = /监护人共有产权房|监护人1产权房|监护人2产权房|监护人1单位集资房|监护人2单位集资房/gi.test(
        this.stuinfo.hometype
      );
      switch (type) {
        case 1:
          if (stulocal) {
            //四城区户籍
            if (hashouse) {
              //有房
              if (/集资房/gi.test(this.stuinfo.hometype)) {
                alert(
                  "请提供：1、户口本；2、" +
                    whohouse +
                    "与单位签订的集资房购房协议及购房发票"
                );
              } else {
                alert("请提供：1、户口本；2、" + whohouse + "的房产证");
              }
            } else {
              //无房
              switch (this.stuinfo.hometype) {
                case "祖父母或外祖父母产权房":
                  alert(
                    "请提供：1、户口本；2、" +
                      whohouse +
                      "的房产证；3、填写无房查询"
                  );
                  break;
                case "监护人1名义租房":
                case "监护人2名义租房":
                  alert(
                    "请提供：1、户口本；2、" +
                      whohouse +
                      "与房东签订的租房合同；3、房东房产证（或者复印件）4、填写无房查询"
                  );
                  break;
                case "监护人1名下单位房":
                case "监护人2名下单位房":
                  alert(
                    "请提供：1、户口本；2、" +
                      whohouse +
                      "与单位签订的租房合同；3、填写无房查询"
                  );
                  break;
                case "监护人1名下公租房（租约房）或廉租房":
                case "监护人2名下公租房（租约房）或廉租房":
                  alert(
                    "请提供：1、户口本；2、" +
                      whohouse +
                      "名下的公租房（租约房）或廉租房证本；3、填写无房查询"
                  );
                  break;
              }
            }
          } else {
            //alert("外来务工");
            alert("请提供户口本");
          }
          break;
        case 2:
          //与监护人1同户籍
          if (stulocal) {
            //四城区户籍
            if (hashouse) {
              //有房
              if(/监护人1/gi.test(this.stuinfo.hometype)){
                alert("请提供：1、户口本;2、"+whohouse+"的房产证")
              }else{
                alert("请提供：1、户口本；2、"+whohouse+"的房产证；3、"+whohouse+"与"+this.stuinfo.stuname+"的关系证明（出生证）或者"+whohouse+"的结婚证")
              }
            } else {
              //无房
            }
          } else {
            //非四城区户籍
          }

          break;
        case 3:
          break;
        case 4:
          break;
      }
    }
  }
};
</script>

<style>
</style>
