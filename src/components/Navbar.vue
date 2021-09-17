<template>
    <div v-if="pageTitle" class="navbar">
        <router-link :to="pageTitle.link">{{pageTitle.text || "no title given"}}</router-link>
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
        }
    }
}
</script>

<style lang="scss">
.navbar{
    width: 100%;
    background-color: #000;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    align-items: center;
    background-color: var(--color3);
    font-size: 2rem;
    margin-bottom: 2rem;

    .profile{
        display: flex;
        position: relative;
        align-items: center;
        user-select: none;

        &:hover .logout{
            opacity: 1;
        }

        img{
            width: 50px;
            border-radius:50% ;
            margin-left: 1rem;
        }
    }
    
    a{
        border-bottom: 3px solid;
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