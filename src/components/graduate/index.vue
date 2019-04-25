<template>
  <f7-page>
    <page1 :stuinfo="stuinfo" v-if="page1show" @nextpage="next" @changeethnic="page1change"></page1>
    <page2 :stuinfo="stuinfo" v-if="page2show" @nextpage="next" @prepage="pre"></page2>
    <page3 :stuinfo="stuinfo" v-if="page3show" @prepage="pre"></page3>
    <loadingdialog :loading="loading" :dialoginfo="dialoginfo" @dialogclose="dialogclose"></loadingdialog>
  </f7-page>
</template>

<script>
import page1 from "@/components/graduate/page1.vue";
import page2 from "@/components/graduate/page2.vue";
import page3 from "@/components/graduate/page3.vue";
import loadingdialog from "@/components/loadingdialog.vue";
import axios from "axios";
export default {
  data() {
    return {
      page1show: true,
      page2show:false,
      page3show:false,
      loading: false,
      stuinfo: {},
      dialoginfo: {
        show: false,
        title: "",
        message: "",
        cb: 0
      }
    };
  },
  components: {
    page1,
    page2,
    page3,
    loadingdialog
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
    this.getbaseinfo();
  },
  methods: {
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
        this.stuinfo.fname=formdata.fname;
        this.stuinfo.sname=formdata.sname;
        this.stuinfo.frelation=formdata.frelation;
        this.stuinfo.srelation=formdata.srelation;
        
        //alert(this.stuinfo.ethnic)
        //this.stuinfo = Object.assign({}, this.stuinfo);
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
    page1change(page1val){
      this.stuinfo.ethnic=page1val
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
        this.loading = false;
        if (res.data.error) {
          this.dialogclosetype = 1;
          this.dialoginfo = {
            show: true,
            title: "错误",
            message: res.data.message
          };
          return;
        }
        // alert(res.data.result.成员2是否监护人);
        this.stuinfo.stuname = res.data.result.学生姓名;
        this.stuinfo.stuclass = res.data.result.班级;
        this.stuinfo.stuid = res.data.result.学籍号;
        this.stuinfo.stupid = res.data.result.身份证件号;
        this.stuinfo.gender = res.data.result.性别;
        this.stuinfo.ethnic = res.data.result.民族;
        this.stuinfo.born = this.stuinfo.stupid.substring(6, 14);
        this.stuinfo.fname = res.data.result.成员1姓名;
        this.stuinfo.frelation = res.data.result.成员1与学生关系;
        //forminfo.fguradian = res.data.result.成员1是否监护人;
        // forminfo.fpidtype =
        //   res.data.result.成员1身份证件类型 == "其他"
        //     ? "居民身份证"
        //     : res.data.result.成员1身份证件类型;
        // forminfo.fpid = res.data.result.成员1身份证件号;

        this.stuinfo.sname = res.data.result.成员2姓名;
        this.stuinfo.srelation = res.data.result.成员2与学生关系;
        // forminfo.sguradian = res.data.result.成员2是否监护人;
        // forminfo.spidtype =
        //   res.data.result.成员2身份证件类型 == "其他"
        //     ? "居民身份证"
        //     : res.data.result.成员2身份证件类型;
        // forminfo.spid = res.data.result.成员2身份证件号;

        //this.$f7.form.fillFromData("#myform", forminfo);
        this.loading = false;
        this.stuinfo = Object.assign({}, this.stuinfo);
        // alert(this.$f7.form.convertToData("#myform"));
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
          title: "出错了",
          message: err
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