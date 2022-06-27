import {createRouter, createWebHistory} from 'vue-router';

const DEFAULT_TITLE = 'Task list application';
const routes = [
    {path: '/login', component: () => import('./components/RightPanel/signInForm'), meta: {title: 'Login'}},
    {path: '/registration', component: () => import('./components/RightPanel/singUpForm'), meta: {title: 'Registration'}},
    {path: "/:pathMatch(.*)*", component: () => import('./components/RightPanel/currentUser')}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;