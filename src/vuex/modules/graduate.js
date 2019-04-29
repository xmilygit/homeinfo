import axios from 'axios'

const state = {
    graduateinfo: {},
    dialogclosetype:0,
};
const mutations = {
    //设置毕业生基础信息
    setGraduateInfo(state,val){
        state.graduateinfo=val
    },
    //毕业生信息单个属性更改
    setGraduateInfoAttr(state,val){
        state.graduateinfo[val.key]=val.value
    },
    //设置dialog对话框关闭后的事件参数
    setDialogCloseType(state,val){
        state.dialogclosetype=val;
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
                commit('setDialogCloseType',1)
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
            stuinfo.regaddress=res.data.result.现住址;
            stuinfo.homeaddress=res.data.result.家庭地址;
            stuinfo.ftel=res.data.result.成员1联系方式;
            stuinfo.stel=res.data.result.成员2联系方式;
            stuinfo.fpid=res.data.result.成员1身份证件号;
            stuinfo.spid=res.data.result.成员2身份证件号;
            stuinfo.fregaddress = res.data.result.fregaddress;
            stuinfo.sregaddress = res.data.result.sregaddress;
            stuinfo.hashouse = res.data.result.hashouse;
            stuinfo.hometype = res.data.result.hometype;
            stuinfo.sigle = res.data.result.sigle;
            stuinfo.stulocal=res.data.result.stulocal;
            if(!/父亲|母亲/gi.test(stuinfo.frelation)&&!/父亲|母亲/gi.test(stuinfo.srelation))
            ;
            else if(!/父亲|母亲/gi.test(stuinfo.frelation)){
                stuinfo.fname=stuinfo.sname;
                stuinfo.frelation=stuinfo.srelation;
            }else if(!/父亲|母亲/gi.test(stuinfo.srelation)){
                stuinfo.sname='';
            }

            commit('setGraduateInfo',stuinfo)
        } catch (err) {
            commit('ChangeShowPreloader', false, { root: true })
            switch (err) {
                case "关键数据链接失效或者是非法的！":
                    commit('setDialogCloseType',1)//this.dialogclosetype = 1;
                    break;
                // default:
                    //this.dialogclosetype = 0;
                    // commit('setDialogCloseType',0)
                    // break;
            }
            commit('ChangeDialog',{
                show:true,
                error:true,
                message:"错误：服务器未执行操作（" + err + "）",
                title:'系统出错了',
                result:'',
                from:'获取毕业生基础数据回调'
            },{root:true})
            commit('setDialogCloseType',1)
        }
    },
    //修改毕业生信息中的单个属性
    modiGraduateInfoAttr({commit},val){
        commit('setGraduateInfoAttr',val)
    },
    //信息存入数据库
    async saveGraduateInfo({commit}){
        commit('ChangeShowPreloader', true, { root: true })

        try {
            let res = await axios.post("/graduate/getresult/", 
            {stuinfo:state.graduateinfo},
            {
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
                    from:'存储毕业生数据并获取毕业类型回调'
                },{root:true})
                commit('setDialogCloseType',1)
                return;
            }
            commit('ChangeDialog',{
                show:true,
                error:false,
                message:"毕业生信息已经保存成功，需要提交的材料已显示在公众号窗口中，确定后该窗口将关闭",
                title:'提示',
                result:'',
                from:'存储毕业生数据并获取毕业类型回调'
            },{root:true})
            commit('setDialogCloseType',1)
            return;
        }catch(err){
            commit('ChangeShowPreloader', false, { root: true })
            switch (err) {
                case "关键数据链接失效或者是非法的！":
                    commit('setDialogCloseType',1)
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
                from:'存储毕业生数据并获取毕业类型回调'
            },{root:true})
            commit('setDialogCloseType',1)
        }
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

