<template>
    <f7-card class="demo-facebook-card">
      <f7-card-header class="no-border">
        <div class="demo-facebook-avatar">
          <!-- <i class="f7-icons" style="font-size:50px;">person</i> -->
          <img src="../../assets/face.png" width="50px"/>
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
            ></f7-list-input>
            <f7-list-item title="成员1与孩子的关系" smart-select :smart-select-params="{openIn: 'sheet'}">
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
              required
              validate
            ></f7-list-input>
            <f7-list-item title="成员2与孩子的关系" smart-select :smart-select-params="{openIn: 'sheet'}">
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
        <f7-button fill color="green" @click="next">下一步/f7-button>
      </f7-card-footer>
    </f7-card>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['stuinfo'],
    watch:{
        stuinfo:function(val,oldval){
            this.$f7.form.fillFromData("#page2form", this.stuinfo);
        }
    }
}
</script>

<style>

</style>

