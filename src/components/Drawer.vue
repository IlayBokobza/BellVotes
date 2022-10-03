<template>
    <div @click="hideDrawer" :class="{'drawer--active':showDrawer}" class="drawer">
        <div @click.stop class="menu">
            <h2>עמודי מנהלים</h2>
            <ul>
                <li @click="hideDrawer" v-for="(l,i) in links" :key="i">
                    <router-link :to="l.path">{{l.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'drawer',
    data(){
        return{
            links:[
                {
                    name:'בקשות',
                    path:'/admin',
                },
                {
                    name:'חסימות',
                    path:'/admin/bans',
                },
                {
                    name:'שירים לפעם הבא',
                    path:'/admin/future-songs',
                },
                {
                    name:'חזרה לדף ההצבעות',
                    path:'/vote',
                }
            ]
        }
    },
    methods:{
        hideDrawer(){
            this.$store.commit('hideDrawer')
        }
    },
    computed:{
        showDrawer(){
            return this.$store.state.showDrawer
        },
    },
}
</script>

<style lang="scss">
.drawer{
    visibility: hidden;
    position: fixed;
    background: rgba(#000,0.0);
    width: 100vw;
    height: 100vh;
    z-index: 100;
    top: 0;
    transition: all .2s;

    &--active{
        visibility: visible;
        background: rgba(#000,0.3);

        .menu{
            transform: translate(0) !important;
        }
    }

    .menu{
        background-color:var(--color1) ;
        height: 100%;
        max-width: 18rem;
        font-size: 2.2rem;
        padding: .3rem 1rem;
        transition: all .2s;
        transform: translate(-100%);

        *{
            color: var(--color2);

            .router-link-exact-active{
                color: var(--highlight);
            }
        }

        h2{
            margin-bottom: 1rem;
        }

        ul{
            font-size: 2rem;
            padding: 0 2.5rem;

            li{
                margin-bottom: 0.5rem;
                text-decoration: underline;
            }
        }
    }
}
</style>