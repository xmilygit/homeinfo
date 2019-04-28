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
      <form id="page2form">
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
            @input="fnamechange($event.target.value)"
          ></f7-list-input>
          <f7-list-item
            :title="fname+'与'+stuinfo.stuname+'的关系'"
            smart-select
            :smart-select-params="{openIn: 'sheet',sheetCloseLinkText:'确定',closeOnSelect:true,scrollToSelectedItem:true}"
          >
            <select name="frelation">
              <option value="父亲" selected>父亲</option>
              <option value="母亲">母亲</option>
              <option value="祖父母或外祖父母">祖父母或外祖父母</option>
              <option value="其他">其他</option>
            </select>
          </f7-list-item>
          <f7-list-item
            :title="fname+'户籍所在地'"
            smart-select
            :smart-select-params="{openIn: 'sheet',sheetCloseLinkText:'确定',closeOnSelect:true,scrollToSelectedItem:true}"
          >
            <select name="fregaddress">
              <option value="5" selected>与孩子同一户籍</option>
              <option value="4">叠彩区、秀峰区、七星区、象山区</option>
              <option value="3">临桂区</option>
              <option value="2">雁山区</option>
              <option value="1">其他</option>
            </select>
          </f7-list-item>
          <f7-list-input
            name="ftel"
            id="ftel"
            outline
            :label="fname+'联系电话'"
            floating-label
            type="text"
            :placeholder="fname+'联系电话'"
            clear-button
            required
            validate
            pattern="[0-9]*"
          ></f7-list-input>
          <f7-list-input
            name="sname"
            outline
            label="监护人2姓名（无第二监护人可不填写）"
            floating-label
            type="text"
            placeholder="监护人2姓名（无第二监护人可不填写）"
            clear-button
            @input="snamechange($event.target.value)"
          ></f7-list-input>
          <f7-list-item
            :title="sname+'与'+stuinfo.stuname+'的关系'"
            smart-select
            :smart-select-params="{openIn: 'sheet',sheetCloseLinkText:'确定',closeOnSelect:true,scrollToSelectedItem:true}"
            v-if="!sigle"
          >
            <select name="srelation">
              <option value="父亲">父亲</option>
              <option value="母亲" selected>母亲</option>
              <option value="祖父母或外祖父母">祖父母或外祖父母</option>
              <option value="其他">其他</option>
            </select>
          </f7-list-item>
          <f7-list-item
            :title="sname+'户籍所在地'"
            smart-select
            :smart-select-params="{openIn: 'sheet',sheetCloseLinkText:'确定',closeOnSelect:true,scrollToSelectedItem:true}"
            v-if="!sigle"
          >
            <select name="sregaddress">
              <option value="5" selected>与孩子同一户籍</option>
              <option value="4">叠彩区、秀峰区、七星区、象山区</option>
              <option value="3">临桂区</option>
              <option value="2">雁山区</option>
              <option value="1">其他</option>
            </select>
          </f7-list-item>
          <f7-list-input
            v-if="!sigle"
            name="stel"
            id="stel"
            outline
            :label="sname+'联系电话'"
            floating-label
            type="text"
            :placeholder="sname+'联系电话'"
            clear-button
            validate
            pattern="[0-9]*"
          ></f7-list-input>
          <f7-list-item
            title="房产情况"
            smart-select
            :smart-select-params="{openIn: 'sheet',sheetCloseLinkText:'确定',closeOnSelect:true,scrollToSelectedItem:true}"
            :key="sigle"
          >
            <select name="hometype" @change="hometypechange($event.target.value)">
              <option value="监护人共有产权房">监护人共有产权房</option>
              <option value="监护人1产权房">{{fname}}产权房(或者购房合同)</option>
              <option value="监护人2产权房" v-if="!sigle">{{sname}}产权房(或者购房合同)</option>
              <option value="学生名下独立产权房">{{stuinfo.stuname}}名下独立产权房</option>
              <option value="监护人1单位集资房">{{fname}}单位集资房</option>
              <option value="监护人2单位集资房" v-if="!sigle">{{sname}}单位集资房</option>
              <option value="祖父母或外祖父母产权房">祖父母或外祖父母产权房</option>
              <option value="监护人1名义租房">{{fname}}名义租房</option>
              <option value="监护人2名义租房" v-if="!sigle">{{sname}}名义租房</option>
              <option value="监护人1名下单位房">{{fname}}名下单位房</option>
              <option value="监护人2名下单位房" v-if="!sigle">{{sname}}下单位房</option>
              <option value="监护人1名下公租房（租约房）或廉租房">{{fname}}名下公租房（租约房）或廉租房</option>
              <option value="监护人2名下公租房（租约房）或廉租房" v-if="!sigle">{{sname}}名下公租房（租约房）或廉租房</option>
            </select>
          </f7-list-item>
        </f7-list>
      </form>
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-button fill color="green" @click="pre" style="margin-right:5px;">上一步</f7-button>
      <f7-button
        fill
        color="green"
        @click="next"
        style="margin-left:5px;"
        v-if="hashouse||!stuinfo.stulocal"
      >完成</f7-button>
      <f7-button fill color="green" @click="next" style="margin-left:5px;" v-else>下一步</f7-button>
      <!-- <f7-button fill color="green" @click="test" style="margin-left:5px;">下一步</f7-button> -->
    </f7-card-footer>
  </f7-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fname: "监护人1",
      sname: "监护人2",
      sigle: false,
      hashouse: true,
      hometypehtml:null,
    };
  },
  
  watch:{
    sigle:function(val,oldval){
      this.$f7.form.fillFromData("#page2form",{'hometype':this.stuinfo.hometype})
    }
  },
  mounted() {
    this.$f7.form.fillFromData("#page2form", this.stuinfo);
    if (this.stuinfo.fname.length > 1) this.fname = this.stuinfo.fname;
    if (this.stuinfo.sname.length > 1) {
      this.sname = this.stuinfo.sname;
    } else {
      this.sigle = true;
    }
  },
  props: ["stuinfo"],
  methods: {
    ...mapActions("graduate", ["modiGraduateInfoAttr"]),
    test(){
let ss=this.$f7.smartSelect.get('.ts')
    },
    tempsave(go) {
      let formdata = this.$f7.form.convertToData("#page2form");
      if (
        (formdata.frelation == "父亲" || formdata.frelation == "母亲") &&
        (formdata.srelation != "父亲" &&
          formdata.srelation != "母亲" &&
          formdata.sname.trim().length > 1)
      ) {
        this.$f7.dialog.alert(
          "检测到第二监护人填写的不是孩子的父母亲，如果仅有一个监护人，监护人2姓名可不填写",
          "提示"
        );
        return;
      }
      let self = this;
      let dialog = this.$f7.dialog.create({
        title: "提示",
        text: "仅填写了一个监护人姓名，是否是单亲家庭？",
        buttons: [
          {
            text: "是",
            onClick: function(dialog, e) {
              self.modiGraduateInfoAttr({
                key: "sigle",
                value: true
              });
              self.tempsaveother(go, formdata);
            }
          },
          {
            text: "否",
            onClick: function(dialog, e) {
              self.$f7.dialog.alert("请填写监护人2姓名", "提示");
            }
          }
        ]
      });
      if (formdata.sname.trim().length < 2) {
        dialog.open();
      } else {
        this.modiGraduateInfoAttr({
          key: "sigle",
          value: false
        });
        this.tempsaveother(go, formdata);
      }
    },
    tempsaveother(go, formdata) {
      this.modiGraduateInfoAttr({
        key: "fname",
        value: formdata.fname
      });
      this.modiGraduateInfoAttr({
        key: "sname",
        value: formdata.sname
      });
      this.modiGraduateInfoAttr({
        key: "frelation",
        value: formdata.frelation
      });
      this.modiGraduateInfoAttr({
        key: "srelation",
        value: formdata.srelation
      });
      this.modiGraduateInfoAttr({
        key: "ftel",
        value: formdata.ftel
      });
      this.modiGraduateInfoAttr({
        key: "stel",
        value: formdata.stel
      });
      this.modiGraduateInfoAttr({
        key: "hometype",
        value: formdata.hometype
      });
      this.modiGraduateInfoAttr({
        key: "fregaddress",
        value: formdata.fregaddress
      });
      this.modiGraduateInfoAttr({
        key: "sregaddress",
        value: formdata.sregaddress
      });
      this.modiGraduateInfoAttr({
        key: "hashouse",
        value: this.hashouse
      });

      if (go == "pre") {
        this.$emit("prepage", 2);
      } else {
        if (this.hashouse || !this.stuinfo.stulocal) {
          // alert(this.hashouse+"==finished=="+this.stuinfo.stulocal)
          this.$emit("nextpage", "finished");
        } else {
          //alert(this.hashouse+"==2222=="+this.stuinfo.stulocal)
          this.$emit("nextpage", 2);
        }
      }
    },
    pre() {
      this.tempsave("pre");
    },
    next() {
      if (!document.forms["page2form"].reportValidity()) return;
      this.tempsave("next");
    },
    fnamechange(val) {
      if (val.trim().length > 1) this.fname = val;
      else this.fname = "监护人1";
    },
    snamechange(val) {
      if (val.trim().length > 1) {
        this.sname = val;
        this.sigle = false;
      } else {
        this.sname = "监护人2";
        this.sigle = true;
      }
    },
    hometypechange(e) {
      let hashouse = /监护人共有产权房|监护人1产权房|监护人2产权房|监护人1单位集资房|监护人2单位集资房|独立产权房/gi.test(
        e
      );
      this.hashouse = hashouse ? true : false;
    }
  }
};
</script>

<style>
</style>

