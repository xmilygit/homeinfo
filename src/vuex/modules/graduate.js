import axios from 'axios'

const state = {
    graduateinfo: {}
};
const mutations = {
    //设置毕业生基础信息
    setGraduateInfo(state,val){
        state.graduateinfo=val
    },
    //毕业生信息单个属性更改
    setGraduateInfoAttr(state,val){
        state.graduateinfo[val.key]=val.value
    }
};
const actions = {
    //获取毕业生基础信息
    async getGraduateInfo({ commit }, pid) {
        commit('ChangeShowPreloader', true, { root: true })
        let stuinfo = {};

        try {
            let res = await axios.get("/graduate/getbaseinfo/", {
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            });
            commit('ChangeShowPreloader', false, { root: true })
            if (res.data.error) {
                commit('ChangeDialog',{
                    show:true,
                    error:true,
                    message:"错误：服务器执行了操作，但出错了。（" + res.data.message + "）",
                    title:'出错了',
                    result:'',
                    from:'获取毕业生基础数据回调'
                },{root:true})
                return;
            }
            stuinfo.stuname = res.data.result.学生姓名;
            stuinfo.stuclass = res.data.result.班级;
            stuinfo.stuid = res.data.result.学籍号;
            stuinfo.stupid = res.data.result.身份证件号;
            stuinfo.gender = res.data.result.性别;
            stuinfo.ethnic = res.data.result.民族;
            stuinfo.born = stuinfo.stupid.substring(6, 14);
            stuinfo.fname = res.data.result.成员1姓名;
            stuinfo.frelation = res.data.result.成员1与学生关系;
            stuinfo.sname = res.data.result.成员2姓名;
            stuinfo.srelation = res.data.result.成员2与学生关系;
            commit('setGraduateInfo',stuinfo)
        } catch (err) {
            commit('ChangeShowPreloader', false, { root: true })
            switch (err) {
                case "关键数据链接失效或者是非法的！":
                    //this.dialogclosetype = 1;
                    break;
                default:
                    //this.dialogclosetype = 0;
                    break;
            }
            commit('ChangeDialog',{
                show:true,
                error:true,
                message:"错误：服务器未执行操作（" + err + "）",
                title:'系统出错了',
                result:'',
                from:'获取毕业生基础数据回调'
            },{root:true})
        }
    },
    //修改毕业生信息中的单个属性
    modiGraduateInfoAttr({commit},val){
        commit('setGraduateInfoAttr',val)
    }
};
const getters = {

};
const methods = {

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

