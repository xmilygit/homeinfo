import vue from 'vue';
import vuex from 'vuex';
import graduate from '@/vuex/modules/graduate.js'


vue.use(vuex);

const debug=process.env.NODE_ENV!='production';

export default new vuex._Store({
    modules:{
        graduate:graduate
    }
})