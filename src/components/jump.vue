<template>
    <h1>asdfasfs</h1>
</template>
<script>


export default {
    data(){
        return{

        }
    },
    mounted(){
        /*判断是否是微信客户端*/
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') != -1;
            var isAndroid = ua.indexOf('android') != -1;
            var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            if (!isWeixin) {
                window.location="http://mxthink.cross.echosite.cn/test/webpagetopdf"
            }
            /*判断是否是微信客户端 end*/
    }
}
</script>