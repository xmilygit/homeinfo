<template>
  <div style="text-align:center">
    <h2 style="margin-bottom:30px">2020年桂林市小学毕业生登记表</h2>
    <div id="tt"></div>
    <table style="margin:auto">
      <tr>
        <td>
          <span
            style="text-decoration:underline;margin-right:5px;font-weight:bold"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;叠彩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          区
        </td>
        <td>
          <span style="text-decoration:underline;margin-right:5px;margin-left:5px;font-weight:bold">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            桂林市凤集
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          小学
        </td>
        <td>
          <span style="margin-left:5px;">学号:</span>
          <span
            style="text-decoration:underline;margin-right:5px;font-weight:bold"
          >&nbsp;{{stuinfo.sid}}&nbsp;</span>
        </td>
        <td>
          序号:
          <span
            style="text-decoration:underline;margin-right:5px;margin-left:5px;font-weight:bold"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{stuinfo.no}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </td>
      </tr>
    </table>
    <table
      border="0"
      cellspacing="1"
      cellpadding="0"
      bgcolor="black"
      style="margin:auto"
      width="630"
    >
      <tr bgcolor="#fff" height="45" align="center">
        <td width="70">姓名</td>
        <td width="100" style="font-weight:bold">{{stuinfo.name}}</td>
        <td width="40">性别</td>
        <td width="40" style="font-weight:bold">{{stuinfo.gender}}</td>
        <td width="40">民族</td>
        <td width="60" style="font-weight:bold">{{stuinfo.nation}}</td>
        <td width="40">出生年月</td>
        <td width="50" style="font-weight:bold">{{stuinfo.born}}</td>
        <td rowspan="4" width="150">照片</td>
      </tr>
      <tr bgcolor="#fff" height="45" align="center">
        <td>是否队员</td>
        <td style="font-style: italic;font-size:12px">"根据实际情况填写"</td>
        <td>担任职务</td>
        <td colspan="2" style="font-style: italic;font-size:12px">"根据实际情况填写"</td>
        <td>
          健康
          <br />状况
        </td>
        <td colspan="2" style="font-style: italic;font-size:12px">"根据实际情况填写"</td>
      </tr>
      <tr bgcolor="#fff" height="45" align="center">
        <td>父亲姓名</td>
        <td style="font-weight:bold">{{stuinfo.fname}}</td>
        <td rowspan="2">工作单位</td>
        <td colspan="3" style="font-style: italic;font-size:12px;">"根据实际情况填写"</td>
        <td>联系电话</td>
        <td style="font-weight:bold">{{stuinfo.ftel}}</td>
      </tr>
      <tr bgcolor="#fff" height="45" align="center">
        <td>母亲姓名</td>
        <td style="font-weight:bold">{{stuinfo.sname}}</td>
        <td colspan="3" style="font-style: italic;font-size:12px;">"根据实际情况填写"</td>
        <td>联系电话</td>
        <td style="font-weight:bold">{{stuinfo.stel}}</td>
      </tr>
      <tr bgcolor="#fff" height="45" align="center">
        <td>
          户口
          <br />所在地址
        </td>
        <td style="font-size:12px;font-weight:bold">{{stuinfo.regaddress}}</td>
        <td>户口性质</td>
        <td colspan="2" style="font-style: italic;font-size:12px">"不用填写"</td>
        <td colspan="2">家庭详细住址及联系电话</td>
        <td colspan="2" style="font-weight:bold">{{stuinfo.homeaddress}}</td>
      </tr>
    </table>
    <f7-button fill color="green" @click="pdf">download</f7-button>
    <loadingdialog :loading="loading" :dialoginfo="dialoginfo" @dialogclose="dialogclose"></loadingdialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import loadingdialog from "@/components/loadingdialog.vue";
import axios from "axios";
import filesave from "file-saver";

export default {
  data() {
    return {
      loading: false,
      dialoginfo: {
        show: false,
        title: "",
        message: "",
        cb: 0
      }
    };
  },
  computed: {
    ...mapState("graduate", {
      stuinfo: "graduatetableinfo"
    })
  },
  components: {
    loadingdialog
  },
  methods: {
    ...mapActions("graduate", ["graduateTable"]),
    ...mapMutations(["ChangeShowPreloader"]),
    dialogclose() {},
    async pdf() {
      this.ChangeShowPreloader(true);
      try {
        let res = await axios.get("/test/webpagetopdf/", null, {
          responseType: "blob"
        });
        this.ChangeShowPreloader(false);
        const content = res.data;
        // const blob = new Blob([content],{type:"application/pdf"});
        // const fileName = "test.pdf";

        //接收PDF
        var blob = new Blob([content], { type: "application/pdf" });
        
        //接收图片
        // var blob=new Blob([content],{type:'image/png'})
        // window.location=window.URL.createObjectURL(blob)
        filesave.saveAs(blob, "hell.pdf");
      } catch (err) {
        alert(err.message);
      }
    },
    async pdf0() {
      let res = await axios.post("/test/webpagetopdf/", null, {
        responseType: "arraybuffer"
      });

      const content = res.data;
      const blob = new Blob([content], { type: "application/pdf" });
      const fileName = "test.pdf";

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob);
      } else {
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = url;
        link.innerHTML = "download";
        link.setAttribute("download", fileName);
        document.getElementById("tt").appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        // document.getElementById('tt').removeChild(link);
      }
    },
    async pdf1() {
      try {
        let res = await axios.post("/test/webpagetopdf/", null, {
          responseType: "blob"
        });

        const content = res.data;
        const blob = new Blob([content], { type: "application/pdf" });
        const fileName = "test.pdf";

        if ("download" in document.createElement("a")) {
          //支持a标签download的浏览器
          const elink = document.createElement("a"); //创建a标签
          elink.download = fileName; //a标签添加属性
          // elink.style.display = "none";
          elink.innerHTML = "asdfasfas";
          const href = URL.createObjectURL(blob); //.replace('8080','3000');
          elink.href = href;
          // document.body.appendChild(elink);
          document.getElementById("tt").appendChild(elink);
          elink.click(); //执行下载
          // URL.revokeObjectURL(elink.href); //释放url
          // document.body.removeChild(elink); //释放标签
        } else {
          //其他浏览器
          navigator.msSaveBlob(blob, fileName);
        }
        /*
      let blob = new Blob([res.data], { type: res.headers["content-type"] });
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = "xxx.pdf"; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
*/
      } catch (err) {
        alert(err.message);
      }
    }
  },
  mounted() {
    document.getElementById("beginloading").style.display = "none";
    this.graduateTable();
  }
};
</script>