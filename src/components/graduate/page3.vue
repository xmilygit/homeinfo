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
         <f7-block style="padding-top:5px;padding-bottom:5px;">
    <f7-row>
      <f7-col>
        <f7-button
          large
          fill
          color="orange"
        >{{stuinfo.stuname}}与{{stuinfo.fname}}、{{stuinfo.sname}}同户籍</f7-button>
      </f7-col>
    </f7-row>
    <f7-row style="margin-top:5px;">
      <f7-col>
        <f7-button large fill color="blue">{{stuinfo.stuname}}与{{stuinfo.fname}}同户籍</f7-button>
      </f7-col>
    </f7-row>
    <f7-row style="margin-top:5px;">
      <f7-col>
        <f7-button large fill color="lightblue">{{stuinfo.stuname}}与{{stuinfo.sname}}同户籍</f7-button>
      </f7-col>
    </f7-row>
    <f7-row style="margin-top:5px;">
      <f7-col>
        <f7-button large fill color="deeporange">{{stuinfo.stuname}}独立户籍</f7-button>
      </f7-col>
    </f7-row>
    <f7-row style="margin-top:5px;">
      <f7-col>
        <f7-button large fill color="green" @click="pre">上一步</f7-button>
      </f7-col>
    </f7-row>
         </f7-block>
    </f7-card-content>
</f7-card>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['stuinfo'],
    methods:{
        pre(){
            this.$emit('prepage',3)
        }
    }
};
</script>

<style>
</style>
