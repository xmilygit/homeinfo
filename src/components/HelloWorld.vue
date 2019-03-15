<template>
  <div>
    {{info}}
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      info:""
    };
  },
  async beforeCreate(){
    try{
      let res=await axios.get('http://mxthink.cross.echosite.cn/wechat/cgetopenid');
      //let res=await axios.get('/wechat/cgetopenid');
      sessionStorage.setItem('info',res.data.info)
      let info=JSON.parse(res.data.info);
      if(info.isbinder){
        this.$f7router.navigate('/funselect/')
      }
    }catch(err){
      alert(err)
      console.log(err)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
</style>

