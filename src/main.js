import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Login from './components/Login';
import AdminCreate from './components/AdminCreate';
import AdminRead from './components/AdminRead';
import UserRead from './components/UserRead';
import UserCreate from './components/UserCreate';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/createAdmin', component: AdminCreate},
    {path: '/createUser', component: UserCreate},
    {path: '/readAdmin', component: AdminRead},
    {path: '/readUser', component: UserRead},
    {path: '*', redirect: '/'}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

new Vue({
    el: '#app',
    router,
    render: h => {
        return h(App);
    }
});