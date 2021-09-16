<template>
  <div class="login">
      <div id="google-signin-button"></div>
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
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn,
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
        })
    },    
    methods:{
        onSignIn (user) {
            const email = user.getBasicProfile().getEmail()
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
        }
    }
}
</script>