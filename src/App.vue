<template>
    <div>
        <Home />
        <Login />
        <AdminCreate />
    </div>
</template>



<script>
import Home from './components/Home';
import Login from './components/Login';
import AdminCreate from './components/AdminCreate';

export default {
    name: 'App',
    components: {
        Home,
        Login,
        AdminCreate
    }
}
</script>