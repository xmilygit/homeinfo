<template>
  <div>
    <sub1 :data1="dataval"></sub1>
    <p>父组件值：{{dataval}}</p>
    <input type="text"  :value="dataval">
    <button @click="chageval">change</button>
  </div>
</template>

<script>
import sub1 from "@/components/s.vue";
export default {
  data() {
    return {
      dataval: "abcd"
    };
  },
  
  components: {
    sub1
  },
  methods:{
      chageval(){
          this.dataval='123123123'
      }
  }
};
</script>

<style>
</style>
