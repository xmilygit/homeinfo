<template>
  <f7-card class="demo-facebook-card">
      <f7-card-header class="no-border">填表说明</f7-card-header>
      <f7-card-content>
        <p
          style="text-indent:2em"
        >根据桂林市小升初工作安排，现学校将对2019届（2013级）毕业生的基本信息进行采集。由于学籍系统中的信息从孩子入学到现在都没有变动，在这期间有些学生的基本信息可能发生了变化，所以现在需要对学生的基本信息进行重新采集，<font style="color:red">该采集过程结束后系统会根据所填写的信息预判您将提交什么材料来校审核</font>，请家长务必如实填写。</p>
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

      </f7-card-content>
      <f7-card-footer>
        <f7-button fill color="green" @click="begin">我已知晓，开始录入</f7-button>
      </f7-card-footer>
    </f7-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    begin() {
      this.$emit("nextpage", 0);
    },
  }
};
</script>

<style>
</style>
