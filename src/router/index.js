import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'
import Coupons from '@/components/pages/Coupons'
import TestOrders from '@/components/pages/TestOrders'
import TestCheckout from '@/components/pages/TestCheckout'
import Product from '@/components/pages/Product'
import Cart from '@/components/pages/Cart'
import Checkout from '@/components/pages/Checkout'
import ClientCoupous from '@/components/pages/ClientCoupous'
import Like from '@/components/pages/Like'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登入',
      component: Login
    },
    {
      path: '/admin',
      name: '系統',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: '產品管理',
          component: Products,
          meta: { requiresAuth: true },
        }, {
          path: 'orders',
          name: '訂單管理',
          component: Orders,
          meta: { requiresAuth: true },
        }, {
          path: 'coupons',
          name: '優惠碼管理',
          component: Coupons,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/test',
      component: Dashboard,
      children: [
        {
          path: 'test_orders',
          name: '模擬訂單',
          component: TestOrders,
        },
        {
          path: 'test_checkout/:orderId',
          name: '模擬結帳',
          component: TestCheckout,
        }
      ]
    }, {
      path: '/',
      component: Home,
      name: '首頁',
      children: [
        {
          path: 'product/:id',
          name: '商品頁面',
          component: Product,
        },
        {
          path: 'cart',
          name: '購物車',
          component: Cart
        },
        {
          path: 'checkout',
          name: '結帳',
          component: Checkout,
        },
        {
          path: 'checkout/:orderId',
          name: '訂單確認與付款',
          component: TestCheckout,
        },
        {
          path: 'coupons',
          name: '優惠碼',
          component: ClientCoupous
        }, {
          path: 'like',
          props: true,
          name: '喜好項目',
          component: Like
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
