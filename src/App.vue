<template>
    <div id="app">
        <Modal :msg="$store.state.msg"/>
        <transition mode="out-in">
            <router-view class="center"/>
        </transition>
    </div>
</template>


<script>
    import Modal from './components/Modal'

    export default {
        components: {
            Modal
        }
    }
</script>

<style lang="less">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .v-enter{
        opacity: 0;
    }
    .v-enter-to{
        opacity: 1;
    }
    .v-enter-active{
        transition: .5s;
    }
    .v-leave{
        opacity:1;
    }
    .v-leave-to{
        opacity: 0;
    }
    .v-leave-active{
        transition: .5s;
    }
</style>

