import home from '@/components/index.vue'
import funselect from '@/components/funselect.vue'
import homeinfoinput from '@/components/homeinfoinput.vue'
import graduate from '@/components/graduate/index.vue'//'@/components/graduateinput.vue'
import crypto from 'crypto-js'
import sitecfg from '@/cfg/sitecfg.js'
import test from '@/components/p.vue'//'./components/test.vue'

import axios from 'axios'
export default [
    {
        path: '/binder/',
        component: home,
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
        path:'/graduateinput/',
        component:graduate//test//
    },
    {
        path: '/',
        redirect: async function (route, resolve, reject) {
            // var ua = navigator.userAgent.toLowerCase();
            // var isWeixin = ua.indexOf('micromessenger') != -1;
            // var isAndroid = ua.indexOf('android') != -1;
            // var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            // if (!isWeixin) {
            //     resolve('/error/')
            //     return
            // }
            resolve('/funselect/')
            try {
                let res = await axios.post(
                    sitecfg.serverURL + sitecfg.valitoken,
                    null,
                    {
                        headers: {
                            Authorization: route.query.token
                        }
                    }
                );
                if (res.data.vali) {
                    sessionStorage.setItem("token", route.query.token)
                    resolve('/funselect/')
                } else{
                    alert('error')
                    resolve("/error/")
                }
            } catch (err) {
                alert('12312312'+err)
            }
        }
    }

]
