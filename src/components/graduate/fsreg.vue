<template>
  <f7-card class="demo-facebook-card">
    <f7-card-header class="no-border">
      <div class="demo-facebook-avatar">
        <img src="../../assets/face.png" width="50px">
      </div>
      <div class="demo-facebook-name">{{stuinfo.stuname}}</div>
      <div class="demo-facebook-date">{{stuinfo.stuclass}}</div>
      <div class="demo-facebook-date">学籍号：{{stuinfo.stuid}}</div>
    </f7-card-header>
    <f7-card-content :padding="false">
      <form id="fsregform">
        <f7-list>
          <f7-list-item
            :title="fname+'户籍所在地'"
            smart-select
            :smart-select-params="{openIn: 'sheet'}"
          >
            <select name="fregaddress">
              <option value="4" selected>叠彩区、秀峰区、七星区、象山区</option>
              <option value="2">雁山区、临桂区</option>
              <option value="1">其他</option>
            </select>
          </f7-list-item>
          <f7-list-item
            :title="sname+'户籍所在地'"
            smart-select
            :smart-select-params="{openIn: 'sheet'}"
          >
            <select name="sregaddress">
              <option value="4" selected>叠彩区、秀峰区、七星区、象山区</option>
              <option value="2">雁山区、临桂区</option>
              <option value="1">其他</option>
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
    this.$f7.form.fillFromData("#fsregform", this.stuinfo);
    if (this.stuinfo.fname.length > 1) this.fname = this.stuinfo.fname;
    if (this.stuinfo.sname.length > 1) this.sname = this.stuinfo.sname;
  },
  props: ["stuinfo",'prepage'],
  methods: {
    ...mapActions("graduate", ["modiGraduateInfoAttr"]),
    tempsave(){
        let formdata = this.$f7.form.convertToData("#fsregform");
        this.modiGraduateInfoAttr({key:'fregaddress',value:formdata.fregaddress});
        this.modiGraduateInfoAttr({key:'sregaddress',value:formdata.sregaddress});
    },
    pre() {
        this.tempsave();
        this.$emit('prepage',this.prepage)
    },
    next() {
        this.tempsave();
        this.$emit('nextpage',this.prepage)
    }
  }
};
</script>

<style>
</style>
