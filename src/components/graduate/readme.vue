<template>
  <div>
    <f7-fab position="right-top" slot="fixed" color="yellow" @click="openhelp">
      说明
    </f7-fab>

    <f7-sheet class="demo-sheet" style="padding:5px;" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left">填表说明</div>
        <div class="right">
          <f7-link sheet-close>关闭</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <p
          style="text-indent:2em;"
        >学生的身份证号、学籍号、性别、出生日期不能修改，如果对以上信息有疑问，请上报班主任。</p>
        <p style="text-indent:2em">1.民族：填写户籍薄上民族一栏，从列表中点选。</p>
        <p style="text-indent:2em;color:red">2.学生户籍地址：填写学生所在户口本首页上的地址，一定要写全不能缩写要与户口本上地址一致。</p>
        <p style="text-indent:2em;color:red">3.家庭住址详细地址:填写监护人产权房房产证上地址这一栏的内容，包含门牌号码部分。无产权房的请填写出租房的地址。该地址将作为市局就近入学的分配依据。</p>
        <p style="text-indent:2em">4.监护人1和监护人2：如果没有特殊情况，监护人只能是父亲、母亲，如果只有一个监护人的，监护人2可以不用填写。</p>
        <p style="text-indent:2em">5.监护人与学生的关系：如果没有特殊情况，这里只选择父亲或者母亲。</p>
        <p style="text-indent:2em;color:red">6.房产情况：一定要按实际情况选择。</p>
        <p style="text-indent:2em">7.无房查询身份证登记：监护人无产权房的才需要填写，系统会根据所填信息自动弹出表单。叠彩区教育局将统一到房管局查询房产情况，如查出监护人有产权房，则将按所查出的房产地址作为分配依据。</p>
      </f7-page-content>
    </f7-sheet>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      sheetOpened: false,
    };
  },
  methods: {
    openhelp() {
      this.sheetOpened = true;
    },
  }
};
</script>

<style>
</style>
