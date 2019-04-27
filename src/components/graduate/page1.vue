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
      <f7-block>
      <p style="em:2">学生身份证号：{{stuinfo.stupid}}</p>
      <p>性别：{{stuinfo.gender}}</p>
      <p>出生日期：{{stuinfo.born}}</p>
      </f7-block>
      <form id="page1form">
        <f7-list no-hairlines-md>
          <f7-list-item title="民族" smart-select :smart-select-params="{openIn: 'sheet'}">
            <select name="ethnic">
              <option
                v-for="(item,key) in ethniclist"
                :key="item.id"
                :value="item.ethnic"
              >{{item.ethnic}}</option>
            </select>
          </f7-list-item>
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
        </f7-list>
      </form>
      <!-- <p>
        <f7-button fill color="green" style="margin:0px 15px 0px 15px" @click="next">已确认学生信息，下一步</f7-button>
      </p> -->
      <!-- <p>
        <f7-button fill color="red" style="margin:0px 15px 0px 15px">学生信息有误请告知班主任</f7-button>
      </p> -->
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-button fill color="green"  @click="next">已确认学生信息，下一步</f7-button>
    </f7-card-footer>
  </f7-card>
</template>

<script>
import ethnic from "@/cfg/ethnic.json";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      ethniclist: ethnic
    };
  },

  mounted() {
    this.$f7.form.fillFromData("#page1form", this.stuinfo);
  },
  props: ["stuinfo"],
  methods: {
    ...mapActions("graduate", ["modiGraduateInfoAttr"]),
    next() {
      let formdata = this.$f7.form.convertToData("#page1form");
      this.modiGraduateInfoAttr({ key: "ethnic", value: formdata.ethnic });
      this.modiGraduateInfoAttr({
        key: "regaddress",
        value: formdata.regaddress
      });
      this.modiGraduateInfoAttr({
        key: "homeaddress",
        value: formdata.homeaddress
      });

      this.$emit("nextpage", 1);
    }
  }
};
</script>