<template>
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <!-- initial page is specified in routes.js -->
    <f7-view main url="/"></f7-view>
  </f7-app>
</template>

<script>
import routes from "./routes.js";
export default {
  data() {
    return {
      f7params: {
        routes,
        name: "my app",
        id: "com.myapp.test",
        theme:'auto'
      }
    };
  }
};
</script>

<style>
</style>
