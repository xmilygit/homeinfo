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
              <option value="兄弟姐妹">兄弟姐妹</option>
              <option value="其他">其他</option>
            </select>
          </f7-list-item>
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
              <option value="兄弟姐妹">兄弟姐妹</option>
              <option value="其他">其他</option>
            </select>
          </f7-list-item>
        </f7-list>
      </form>
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-button fill color="green" @click="pre">上一步</f7-button>
      <f7-button fill color="green" @click="next">下一步</f7-button>
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
                value:true
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
          value:false
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

