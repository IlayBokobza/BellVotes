<template>
  <div class="bans">
      <div class="ban-card" v-for="ban in bans" :key="ban._id">
          <ul>
              <li>נחסם על ידי: <span>{{ban.admin}}</span></li>
              <li>שם התלמיד: <span>{{ban.userName}}</span></li>
              <li>איימל של התלמיד: <span>{{ban.userEmail}}</span></li>
              <li>נחסם ב <span>{{ban.date}}</span></li>
              <li>חסום עד <span>{{ban.bannedUntil}}</span></li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  beforeCreate(){
    this.$store.commit('setTitle',{
      text:'רשימת בקשות',
      link:'/admin'
    })
  },
  computed:{
    bans(){
      return this.$store.state.bans
    }
  }
}
</script>

<style lang="scss">
.bans{
  .ban-card{
    background-color: var(--color2);
    width: 35%;
    font-size: 3rem;
    margin: 0 auto;
    padding: 1rem 3rem;
    border-radius: 10px;
    box-shadow: 13px 13px 14px rgba(rgb(32, 32, 32),.5);
    margin-bottom: 2rem;

    span{
      color: #2e2e2e;
    }
  }
}
</style>