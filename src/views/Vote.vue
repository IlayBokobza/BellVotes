<template>
  <div class="vote" id="votes">
    <TopSongs v-if="songs.length > 0" :songs="songs" />  
    <!-- songs table -->
    <div class="table">
      <div class="top">
        <span>שם</span>
        <span>הומלץ על ידי</span>
        <span>הצבעות</span>
        <span>השמעה</span>
        <span>הצבעה</span>
      </div>
      <div class="row" v-for="s in songs" :key="s._id">
        <span>{{s.title}}</span>
        <span>{{s.ownerName}}</span>
        <span>{{s.votes}}</span>
        <span class="material-icons play" @click="playsound(s.songData)">volume_up</span>
        <span @click="selectedSong = s._id"><Checkbox :id="s._id" :trigger="selectedSong" /></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TopSongs from '../components/TopSongs.vue'
import Checkbox from '../components/Checkbox.vue'
export default {
  name:'vote',
  components:{
    TopSongs,
    Checkbox,
  },
  data(){
    return {
      songs:[],
      playingSound:new Audio(),
      selectedSong:null,
    }
  },
  beforeCreate(){
    this.$store.commit('setTitle',{
      text:'הציעו שיר לפעם הבא',
      link:'/submit'
    })
  },
  async created(){
      const {data} = await axios.get('/api/submit/accpeted')
      data.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
      
      this.songs = data
  },
  methods:{
    playsound(sound){
      this.playingSound.pause()
      this.playingSound = new Audio(`data:audio/mp3;base64,${sound}`)
      this.playingSound.play()
    }
  }
}
</script>

<style lang="scss">
.table{
  margin: 2rem 0 10rem;
  user-select: none;

  .top,.row{
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 2rem;
    width: 75%;
    margin: 0 auto;
    padding: .2rem;
    
    span{
      width: 25%;
      text-align: center;
      display: grid;
      place-items: center;
    }
  }

  .top{
    background-color: var(--color4);
  }

  .row{
    background-color: var(--color5);
    transition: all .1s;

    &:hover{
      background-color: var(--color4);
    }
  }

  .play{
    cursor: pointer;
  }
}
</style>