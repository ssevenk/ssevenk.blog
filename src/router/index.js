import Vue from 'vue'
import Router from 'vue-router'
import ShowBlogs from '@/components/ShowBlogs'
import ShowEssays from '@/components/ShowEssays'
import ShowArticles from '@/components/ShowArticles'
import TheOne from '@/components/TheOne'
import Manage from '@/components/Manage'
import Edit from '@/components/Edit'
import EditArticle from '@/components/EditArticle'
import Front from '@/components/Front'

Vue.use(Router)

export default new Router({
  routes: [
    // 前台页面路由
    {
      path:'/',
      component:Front,
      redirect:'/Blogs',
      children:[{
        path: 'Blogs',
        name: 'ShowBlogs',
        component: ShowBlogs
      },
      {
        path: 'Essays',
        name: 'Essays',
        component: ShowEssays
      },
      {
        path: 'Articles',
        name: 'Articles',
        component: ShowArticles
      },
      {
        path:'TheOne/:kind/:id',
        name:'TheOne',
        component:TheOne
      },
    ]
    },

    //后台页面路由
    {
      path:'/Manage',
      name:'Manage',
      component:Manage
    },
    {
      path:'/Edit/article/:id',
      name:'EditArticle',
      component:EditArticle
    },
    {
      path:'/Edit/:kind/:id',
      name:'Edit',
      component:Edit
    }
  ]
})
