<template>
    <div>子组件数据：{{data1}}</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['data1'],
    // watch:{
    //     data1:function(val,oldval){
    //         alert(val)
    //     }
    // }
}
</script>

<style>

</style>
