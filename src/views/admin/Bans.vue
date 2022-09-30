<template>
  <div class="bans">
      <div class="search-box">
        <Input text="חיפוש" @newValue="search = $event"/>
      </div>
      <div class="ban-card" v-for="ban in bans" :key="ban._id">
          <ul>
              <li>נחסם על ידי: <span>{{ban.admin}}</span></li>
              <li>שם התלמיד: <span>{{ban.userName}}</span></li>
              <li>איימל של התלמיד: <span>{{ban.userEmail}}</span></li>
              <li>נחסם ב <span>{{ban.date}}</span></li>
              <li>חסום עד <span>{{ban.bannedUntil}}</span></li>
              <li>נחסם בגלל "<a :href="`https://youtu.be/${ban.bannedFor.link}`">{{ban.bannedFor.title}}</a>"</li>
          </ul>
      </div>
  </div>
</template>

<script>
import Input from '../../components/Input.vue'
export default {
  components: { Input },
  data(){
    return{
      search:null,
    }
  },
  beforeCreate(){
    this.$store.commit('setTitle',{
      text:'רשימת בקשות',
      link:'/admin'
    })
  },
  computed:{
    bans(){
      if(this.search){
        return this.$store.state.bans.filter(ban => ban.userName.includes(this.search.trim()))
      }
      return this.$store.state.bans
    }
  }
}
</script>

<style lang="scss">
.bans{
  .ban-card{
    background-color: var(--color2);
    min-width: 40vw;
    width: calc(768px - 5vw);
    max-width: 80vw;
    font-size: clamp(2.1rem,2.5vw,3rem);
    margin: 0 auto;
    padding: 1rem 3rem;
    border-radius: 10px;
    box-shadow: 13px 13px 14px rgba(rgb(32, 32, 32),.5);
    margin-bottom: 2rem;

    ::selection{
      background-color: var(--color1);
    }

    span{
      color: #2e2e2e;
    }

    a{
      color: var(--color3);
      text-decoration: underline;
    }
  }

  .search-box{
    width: 70%;
    margin: 0 auto;
    margin-bottom: 3rem;
  }
}
</style>