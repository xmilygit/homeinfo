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
            label="成员1姓名"
            floating-label
            type="text"
            placeholder="成员1姓名"
            clear-button
            required
            validate
            @input="fnamechange($event.target.value)"
          ></f7-list-input>
          <f7-list-item
            :title="fname+'与'+stuinfo.stuname+'的关系'"
            smart-select
            :smart-select-params="{openIn: 'sheet'}"
          >
            <select name="frelation">
              <option value="父亲" selected>父亲</option>
              <option value="母亲">母亲</option>
              <option value="祖父母或外祖父母">祖父母或外祖父母</option>
              <option value="其他">其他</option>
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
          ></f7-list-input>
          <f7-list-input
            name="sname"
            outline
            label="成员2姓名"
            floating-label
            type="text"
            placeholder="成员2姓名"
            clear-button
            @input="snamechange($event.target.value)"
          ></f7-list-input>
          <f7-list-item
            :title="sname+'与'+stuinfo.stuname+'的关系'"
            smart-select
            :smart-select-params="{openIn: 'sheet'}"
          >
            <select name="srelation">
              <option value="父亲">父亲</option>
              <option value="母亲" selected>母亲</option>
              <option value="祖父母或外祖父母">祖父母或外祖父母</option>
              <option value="其他">其他</option>
            </select>
          </f7-list-item>
          <f7-list-input
            name="stel"
            id="stel"
            outline
            :label="sname+'联系电话'"
            floating-label
            type="text"
            :placeholder="sname+'联系电话'"
            clear-button
            validate
          ></f7-list-input>
          <f7-list-input
            name="regaddress"
            outline
            label="学生户籍地址"
            floating-label
            type="text"
            placeholder="学生所在户口本首页地址"
            clear-button
            required
            validate
          ></f7-list-input>
          <f7-list-input
            name="homeaddress"
            outline
            label="家庭住址详细地址"
            floating-label
            type="text"
            placeholder="家庭住址详细地址"
            clear-button
            required
            validate
          ></f7-list-input>
          <f7-list-item
            title="房产情况"
            smart-select
            :smart-select-params="{openIn: 'sheet'}"
          >
            <select name="hometype">
              <option value="监护人共有产权房" selected>监护人共有产权房</option>
              <option value="监护人1产权房">{{fname}}产权房</option>
              <option value="监护人2产权房">{{sname}}产权房</option>
              <option value="监护人1单位集资房">{{fname}}单位集资房</option>
              <option value="监护人2单位集资房">{{sname}}单位集资房</option>
              <option value="祖父母或外祖父母产权房">祖父母或外祖父母产权房</option>
              <option value="监护人1名义租房">{{fname}}名义租房</option>
              <option value="监护人2名义租房">{{sname}}名义租房</option>
              <option value="监护人1名下单位房">{{fname}}名下单位房</option>
              <option value="监护人2名下单位房">{{sname}}下单位房</option>
              <option value="监护人1名下公租房（租约房）或廉租房">{{fname}}名下公租房（租约房）或廉租房</option>
              <option value="监护人2名下公租房（租约房）或廉租房">{{sname}}名下公租房（租约房）或廉租房</option>
            </select>
          </f7-list-item>
        </f7-list>
      </form>
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-button fill color="green" @click="pre" style="margin-right:5px;">上一步</f7-button>
      <f7-button fill color="green" @click="next" style="margin-left:5px;">下一步</f7-button>
    </f7-card-footer>
  </f7-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fname: "监护人1",
      sname: "监护人2"
    };
  },
  mounted() {
    this.$f7.form.fillFromData("#page2form", this.stuinfo);
    if (this.stuinfo.fname.length > 1) this.fname = this.stuinfo.fname;
    if (this.stuinfo.sname.length > 1) this.sname = this.stuinfo.sname;
  },
  props: ["stuinfo"],
  methods: {
    ...mapActions("graduate", ["modiGraduateInfoAttr"]),

    tempsave(go) {
      let formdata = this.$f7.form.convertToData("#page2form");
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
        key:"ftel",
        value:formdata.ftel
      });
      this.modiGraduateInfoAttr({
        key:'stel',
        value:formdata.stel
      });
      this.modiGraduateInfoAttr({
        key:'regaddress',
        value:formdata.regaddress
      });
      this.modiGraduateInfoAttr({
        key:'homeaddress',
        value:formdata.homeaddress
      });
      this.modiGraduateInfoAttr({
        key:'hometype',
        value:formdata.hometype
      })
      if (go == "pre") this.$emit("prepage", 2);
      else this.$emit("nextpage", 2);
    },
    pre() {
      this.tempsave("pre");
    },
    next() {
      this.tempsave("next");
    },
    fnamechange(val) {
      if (val.trim().length > 1) this.fname = val;
      else this.fname = "监护人1";
    },
    snamechange(val) {
      if (val.trim().length > 1) this.sname = val;
      else this.sname = "监护人2";
    }
  }
};
</script>

<style>
</style>

