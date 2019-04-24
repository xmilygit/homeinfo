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
        path:'/',
        component:graduate//test//
    }
    /*
    {
        path: '/',
        redirect: async function (route, resolve, reject) {
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
                } else
                    resolve("/error/")
            } catch (err) {
                alert(err)
            }
        }


    }
    */
]
