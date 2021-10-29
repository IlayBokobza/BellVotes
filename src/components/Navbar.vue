<template>
    <div v-if="pageTitle" class="navbar">
        <div class="links">
            <router-link v-if="isAdmin && ($route.path === '/admin' || $route.path === '/bans')" to="/vote">חזרה</router-link>
            <router-link v-else-if="isAdmin" to="/admin">לעמוד המנהלים</router-link>
            <router-link :to="pageTitle.link">{{pageTitle.text || "no title given"}}</router-link>
        </div>
        <div class="profile">
            <p>{{username}}</p>
            <img :src="image" alt="">
            <div @click="logout" class="logout">התנתק</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Navbar",
    methods:{
        logout(){
            this.$store.dispatch('signout')
            location.reload()
        }
    },
    computed:{
        username(){
            return this.$store.state.name
        },
        image(){
            return this.$store.state.image
        },
        pageTitle(){
            return this.$store.state.pageTitle
        },
        isAdmin(){
            return this.$store.state.isAdmin
        }
    }
}
</script>

<style lang="scss">
.navbar{

    @media only screen and (max-width: 500px){
        font-size: 1.5rem;
    }

    width: 100%;
    background-color: #000;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    align-items: center;
    background-color: var(--color3);
    font-size: 2rem;
    margin-bottom: 2rem;

    .links a{
        margin-right: 1rem;
    }

    .profile{
        display: flex;
        position: relative;
        align-items: center;
        user-select: none;
        max-width: 9.75rem;

        &:hover .logout{
            opacity: 1;
        }

        img{
            //50px
            width: 3.125rem;
            height: 3.125rem;

            border-radius:50% ;
            margin-left: 1rem;
        }
    }
    
    a{
        border-bottom: 3px solid;
        @media only screen and (max-width: 360px){
            display: block;
            width: fit-content;

            &:not(:last-of-type){
                margin-bottom: .5rem;
            }
        }
    }

    .logout{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color:var(--color2);
        display: grid;
        place-items:center;
        font-size: 2.5rem;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0;
        transition: all .3s;
    }
}
</style>