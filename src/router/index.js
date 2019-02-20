import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden    : true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name    : 'router-name'             the name is used by <keep-alive> (must set!!!)
* meta    : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon : 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'home',
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/home/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/webset',
    component: Layout,
    redirect: '/webset/info',
    name: 'WebSet',
    meta: { title: '网站设置', icon: 'web' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/webset/info/index'),
        meta: { title: '网站信息' }
      },
      {
        path: 'seo',
        name: 'Seo',
        component: () => import('@/views/webset/seo/index'),
        meta: { title: 'SEO设置' }
      },
      {
        path: 'cdn',
        name: 'Cdn',
        component: () => import('@/views/webset/cdn/index'),
        meta: { title: 'CDN设置' }
      },
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/webset/banner/index'),
        meta: { title: '幻灯片设置' }
      },
      {
        path: 'navigat',
        name: 'Navgiat',
        component: () => import('@/views/webset/navigat'),
        meta: { title: '导航栏' }
      }
    ]
  },

  {
    path: '/products',
    component: Layout,
    redirect: '/products/prlist',
    name: 'Products',
    meta: { title: '产品管理', icon: 'product' },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/products/category'),
        meta: { title: '分类管理' }
      },
      {
        path: 'prlist',
        name: 'Prlist',
        component: () => import('@/views/products/prlist'),
        meta: { title: '产品列表' }
      },
      {
        path: 'property',
        name: 'Property',
        component: () => import('@/views/products/property'),
        meta: { title: '产品属性' }
      },
      {
        path: 'prlabel',
        name: 'Prlabel',
        component: () => import('@/views/products/prlabel'),
        meta: { title: '产品检索' }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/products/statistics'),
        meta: { title: '数据分析', roles: ['super'] }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    name: 'Content',
    redirect: '/content/page',
    meta: { title: '内容管理', icon: 'content' },
    children: [
      {
        path: 'page',
        name: 'page',
        component: () => import('@/views/content/page'),
        meta: { title: '页面管理' }
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/content/article'),
        meta: { title: '文章管理' }
      },
      {
        path: 'friendlink',
        name: 'friendlink',
        component: () => import('@/views/content/friendlink'),
        meta: { title: '友情连接' }
      }
    ]
  },

  {
    path: '/img',
    component: Layout,
    meta: { roles: ['super'] },
    children: [
      {
        path: 'manage',
        name: 'Imgmanage',
        component: () => import('@/views/imgmanage'),
        meta: { title: '图片管理', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/system',
  //       name: 'System',
  //       component: () => import('@/views/system'),
  //       meta: { title: '系统设置', icon: 'set' }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/987763485',
        meta: { title: '微发现', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
