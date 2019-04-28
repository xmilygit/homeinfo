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
      <f7-block-title>无房查询身份证登记</f7-block-title>
      <form id="checkhomeform">
        <f7-list>
          <f7-list-input
            name="fpid"
            id="fpid"
            outline
            :label="fname+'身份证号'"
            floating-label
            type="text"
            :placeholder="fname+'身份证号'"
            clear-button
            required
            validate
            pattern="^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$"
          ></f7-list-input>
          <f7-list-input
            name="spid"
            id="spid"
            outline
            :label="sname+'身份证号'"
            floating-label
            type="text"
            :placeholder="sname+'身份证号'"
            clear-button
            required
            v-if="!stuinfo.sigle"
            validate
            pattern="^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$"
          ></f7-list-input>
        </f7-list>
      </form>
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-button fill color="green" @click="pre" style="margin-right:5px;">上一步</f7-button>
      <f7-button fill color="green" @click="next" style="margin-left:5px;">完成</f7-button>
    </f7-card-footer>
  </f7-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
data() {
    return {
      fname: "监护人1",
      sname: "监护人2"
    };
  },
  mounted() {
    this.$f7.form.fillFromData("#checkhomeform", this.stuinfo);
    if (this.stuinfo.fname.length > 1) this.fname = this.stuinfo.fname;
    if (this.stuinfo.sname.length > 1) this.sname = this.stuinfo.sname;
  },
  props: ["stuinfo"],
  methods: {
    ...mapActions("graduate", ["modiGraduateInfoAttr"]),
    tempsave(){
        let formdata = this.$f7.form.convertToData("#checkhomeform");
        this.modiGraduateInfoAttr({
            key:'fpid',
            value:formdata.fpid
        })
        this.modiGraduateInfoAttr({
            key:'spid',
            value:formdata.spid
        })
    },
    pre(){
        this.tempsave()
        this.$emit('prepage','checkhome')
    },
    next(){
      if (!document.forms["checkhomeform"].reportValidity()) return;
        this.tempsave()
        this.$emit('nextpage','finished')
    }
  }
}
</script>

<style>
</style>
