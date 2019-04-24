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
    <f7-card-content>
      <p>学生身份证号：{{stuinfo.stupid}}</p>
      <p>性别：{{stuinfo.gender}}</p>
      <p>出生日期：{{stuinfo.born}}</p>
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
        </f7-list>
      </form>
      <p>
      <f7-button fill color="green" @click="next">已确认学生信息，下一步</f7-button>
      </p>
      <p>
          <f7-button fill color="red">学生信息有误</f7-button>
      </p>
    </f7-card-content>
  </f7-card>
</template>

<script>
import ethnic from "@/cfg/ethnic.json";
export default {
  data() {
    return {
      ethniclist: ethnic
    };
  },
  // mounted() {},
  watch: {
    stuinfo: function(val, oldval) {
      this.$f7.form.fillFromData("#page1form", this.stuinfo);
    }
  },
  props: ["stuinfo"],
  methods:{
      next(){
          this.$emit("nextpage",1)
      }
  }
};
</script>