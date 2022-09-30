<template>
  <div class="login">
      <h1 class="title">!הצילצול הגואל</h1>
      <h2 class="subtitle mb">.היכנסו עם המייל של {{schoolName}} כדי להצביע</h2>
      <div id="g-login"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'login',
    beforeCreate(){
    },
    mounted(){
        let gapi = window.gapi
        gapi.signin2.render('g-login', {
            onsuccess: this.onSignIn,
            width: 240,
            height: 50,
            longtitle: true,
            theme: 'dark',
        })
    },    
    computed:{
        schoolName(){
            return window.metadata.name
        }
    },
    methods:{
        async onSignIn (user) {
            const profile = user.getBasicProfile()

            try {
                await axios.get('/api/auth/isAuth')
            } catch (error) {
                console.log(error.response)
                return
            }

            this.$store.commit('saveUserData',{
                email:profile.getEmail(),
                image:profile.getImageUrl(),
                name:profile.getName(),
                token:user.getAuthResponse().id_token
            })
            this.$router.push('/vote')
        }
    }
}
</script>