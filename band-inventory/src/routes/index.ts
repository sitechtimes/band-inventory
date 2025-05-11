// import { createWebHistory, createRouter } from 'vue-router'

// import userLogin from '../views/userLogin.vue';
// import temptest from '@/views/temptest.vue';

// const router = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes: [
//         { path: '/', name: 'login', component: userLogin },
//         { path: '/test', name: 'test', component: temptest }
//     ]
// })

// export default router


// import the `RouteRecordInfo` type from vue-router to type your routes
import type { RouteRecordInfo } from 'vue-router'

// Define an interface of routes
export interface RouteNamedMap {
    // each key is a name
    home: RouteRecordInfo<
        'home',
        '/',
        Record<never, never>,
        Record<never, never>,
        never
    >
    // repeat for each route...
    // Note you can name them whatever you want
    'named-param': RouteRecordInfo<
        'named-param',
        '/:name',
        { name: string | number }, // Allows string or number
        { name: string }, // but always returns a string from the URL
        'named-param-edit'
    >
    'named-param-edit': RouteRecordInfo<
        'named-param-edit',
        '/:name/edit',
        { name: string | number }, // we also include parent params
        { name: string },
        never
    >
    'article-details': RouteRecordInfo<
        'article-details',
        '/articles/:id+',
        { id: Array<number | string> },
        { id: string[] },
        never
    >
    'not-found': RouteRecordInfo<
        'not-found',
        '/:path(.*)',
        { path: string },
        { path: string },
        never
    >
}

declare module 'vue-router' {
    interface TypesConfig {
        RouteNamedMap: RouteNamedMap
    }
}
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

createRouter({
  history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
  routes
})
