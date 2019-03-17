import home from '@/components/index.vue'
import funselect from '@/components/funselect.vue'
import homeinfoinput from '@/components/homeinfoinput.vue'
import sitecfg from '@/cfg/sitecfg.js'
// import test from './components/test.vue'

// import axios from 'axios'
export default [
    {
        path:'/binder/',
        component:home,
    },
    {
        path: '/funselect/',
        component: funselect
    },
    {
        path: '/homeinfoinput/',
        component: homeinfoinput
    },
    {
        path: '/',
        // component: test,
        redirect: async function (route, resolve, reject) {
            if (route.query.code) {
                //alert(route.query.code)
                window.location.href=sitecfg.serverURL+'/wechatforsvr/binder/?code='+route.query.code;
                return;
            }else if(route.query.token){
                //alert(route.query.token)
                sessionStorage.setItem("token",route.query.token)
                //alert(route.query.isbinder)
                if(route.query.isbinder=='true'){
                    resolve('/funselect/')
                }else{
                    resolve('/binder/')
                }
            }
        }


    }
]
