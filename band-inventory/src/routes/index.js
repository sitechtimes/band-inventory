import { createWebHistory, createRouter } from 'vue-router'

import userLogin from '../views/userLogin.vue';
import temptest from '@/views/temptest.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'login', component: userLogin },
        { path: '/test', name: 'test', component: temptest }
    ]
})

export default router