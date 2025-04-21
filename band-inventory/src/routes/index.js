import { createWebHistory, createRouter } from 'vue-router'

import userLogin from '../components/userLogin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'login', component: userLogin },
    ]
})

export default router