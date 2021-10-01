<template>
  <div class="login">
      <h1 class="title">!הצביעו לצילצול</h1>
      <h2 class="subtitle mb">.היכנסו עם המייל של פלך כדי להצביע</h2>
      <div id="g-login"></div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
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
    methods:{
        onSignIn (user) {
            const profile = user.getBasicProfile()
            const email = profile.getEmail()
            const isPelechEmail = /@pelech\.ort\.org\.il$/i.test(email)

            if(!isPelechEmail){
                Swal.fire({
                    title:'אימייל לא תקין',
                    text:'תנסו להתחבר שוב עם האיימל של פלך',
                    icon:'error',
                    confirmButtonText:'אוקי'
                })

                this.$store.dispatch('signout')
            }
            else{
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
}
</script>