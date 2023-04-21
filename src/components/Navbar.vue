<template>
    <div v-if="pageTitle || isAdminPage" class="navbar">
        <div class="links">
            <span @click="openDrawer" v-if="isAdminPage" class="menu-button material-symbols-outlined">menu</span>
            <router-link v-if="!isAdminPage" :to="pageTitle.link">{{pageTitle.text || "no title given"}}</router-link>
            <router-link class="hightlight--text navbar__exit-btn" v-if="isAdminPage" to="/vote">יציאת מעמוד המנהלים</router-link>
            <router-link class="hightlight--text" v-else-if="isAdmin" to="/admin">לעמוד המנהלים</router-link>
        </div>
        <h2 v-if="isAdminPage" class="navbar__admin-text">עמוד מנהלים</h2>
        <div class="profile">
            <p>{{username}}</p>
            <img @error="fallBackImage" id="navbar-image" :src="image" alt="">
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
        },
        openDrawer(){
            this.$store.commit('showDrawer')
        },
        fallBackImage(){
            document.getElementById('navbar-image').setAttribute('src',require("@/assets/avater.png"))
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
        },
        isAdminPage(){
            return this.isAdmin && this.$route.path.includes('admin')
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
        
        p{
            @media only screen and (max-width: 310px){
                display: none;
            }
        }

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
        @media only screen and (max-width: 420px){
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

    .menu-button{
        margin-right: 1rem;
        cursor: pointer;
    }

    &__exit-btn{
        @media screen and (max-width:660px){
            display: none !important;
        }
    }

    &__admin-text{
        @media screen and (max-width:400px){
            display: none;
        }
    }
}
</style>