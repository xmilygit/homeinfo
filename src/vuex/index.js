import vue from 'vue';
import vuex from 'vuex';
import state from './state.js';
import * as getters from './getter.js';
import mutations from './mutations.js';
import actions from './action.js';
import graduate from '@/vuex/modules/graduate.js'
import axios from 'axios'


vue.use(vuex);

const debug=process.env.NODE_ENV!='production';

const myPlugin=async store=>{
    let {state}=store
    state.showPreloader=true;
    try{
        let rs=await axios.get('/sys/funstatus/?funname=graduate')
        state.graduateStatus=rs.data.result;
        state.showPreloader=false
    }catch(err){
        state.showPreloader=false
        state.dialog={
            show:true,
            error:true,
            message:err.message,
            title:'获取系统开关状态出错',
            result:'',
            from:'root',
        }
    }
}
export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        graduate:graduate
    },
    plugins:[myPlugin]
})