import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'/'
  },
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/FontEnd/Home.vue')
  },
  {
    path: '/product_concert',
    name: 'ProductConcert',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductConcert.vue'),
  },
  {
    path: '/product_drama',
    name: 'ProductDrama',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductDrama.vue'),
  },
  {
    path: '/product_expo',
    name: 'ProductExpo',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductExpo.vue'),
  },
  {
    path: '/product_family',
    name: 'ProductFamily',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductFamily.vue'),
  },
  {
    path: '/product_movie',
    name: 'ProductMovie',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductMovie'),
  },
  {
    path: '/product_music',
    name: 'ProductsMusic',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductMusic.vue'),
  },
  {
    path: '/product_sport',
    name: 'ProductSport',
    component: ()=>import('../views/FontEnd/ProductCategory/ProductSport.vue'),
  },
  {
    path:'/product',
    name:'Product',
    component: ()=>import('../views/FontEnd/Product.vue')
  },
  {
    path: '/admin_login',
    name: 'AdminLogin',
    component: ()=>import('../views/BackEnd/AdminLogin.vue')
  },
  {
    path: '/customer_login',
    name: 'CustomerLogin',
    component: ()=>import('../views/FontEnd/CustomerLogin.vue')
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: ()=>import('../views/BackEnd/DashBoard.vue'),
    meta: { requiresAuth: true },
    children:[
      {
        path: 'productsmanagement',
        name: 'ProductsManagement',
        component: ()=>import('../views/BackEnd/ProductsManagement.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orderlist',
        name: 'OrderList',
        component: ()=>import('../views/BackEnd/OrderList.vue'),
        meta: { requiresAuth: true },
      },      
      {
        path: 'coupons',
        name: 'Coupons',
        component: ()=>import('../views/BackEnd/Coupons.vue'),
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: '/customer_checkout/:orderId',
    name: 'CustomerCheckout',
    component: ()=>import('../views/FontEnd/CustomerCheckout.vue'),
    // meta: { customerLogin: true },
  },
  {
    path: '/customer_order',
    name: 'CustomerOrder',
    component: ()=>import('../views/FontEnd/CustomerPayOrder.vue'),
    // meta: { customerLogin: true },
  },
  {
    path:'/customer_code',
    name:'CustomerCode',
    component:()=>import('../views/FontEnd/CustomerCode.vue'),
    // meta: { customerLogin: true },
  },
  {
    path:'/history_order',
    name:'HistoryOrder',
    component:()=>import('../views/FontEnd/HistoryOrder.vue'),
    // meta: { customerLogin: true },
  },
]

const router = new VueRouter({
  routes
})

export default router
