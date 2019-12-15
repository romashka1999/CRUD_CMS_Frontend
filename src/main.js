import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Login from './components/Login';
import AdminCreate from './components/AdminCreate';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/signUp', component: AdminCreate}
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