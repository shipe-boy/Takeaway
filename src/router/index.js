import Vue from 'vue'
import Router from 'vue-router'


import Goods from '../components/goods'
import Seller from '../components/seller'
import Ratings from '../components/ratings'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/goods'
        }, {
            path: '/goods',
            name: 'goods',
            component: Goods
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: Ratings
        },
        {
            path: '/seller',
            name: 'seller',
            component: Seller
        }
    ]
})