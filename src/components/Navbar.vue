<template>
    <div v-if="pageTitle" class="navbar">
        <router-link :to="pageTitle.link">{{pageTitle.text || "no title given"}}</router-link>
        <div class="logout">
            <p>{{username}}</p>
            <img :src="image" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:"Navbar",
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

    .logout{
        display: flex;
        align-items: center;

        img{
            width: 50px;
            border-radius:50% ;
            margin-left: 1rem;
        }
    }
    
    a{
        border-bottom: 3px solid;
    }
}
</style>