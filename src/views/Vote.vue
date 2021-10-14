<template>
  <div class="vote" id="votes" v-if="songs.length > 0">
    <TopSongs v-if="songs.length >= 5" :songs="songs" />  
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
        <span class="material-icons play" v-if="isPlaying && s._id == playingSoundId" @click="playsound(s)">pause</span>
        <span class="material-icons play" v-else @click="playsound(s)">volume_up</span>
        <span @click="vote(s)"><Checkbox :id="s._id" :trigger="selectedSong" /></span>
      </div>
    </div>
  </div>
  <h1 v-else>עדיין לא הועלו שירים</h1>
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
      playingSoundId:null,
      isPlaying:false,
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
    this.$emit('toogleLoad')
    //gets the songs
    const {data} = await axios.get('/api/submit/accpeted')
    data.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
    this.songs = data

    //gets the user's vote
    const {data:vote} = await axios.get('/api/submit/myVote')
    this.selectedSong = vote
    this.$emit('toogleLoad')
  },
  methods:{
    async vote(s){
      if(this.selectedSong == s._id) return
      const newSelectedIndex = this.songs.findIndex((item) => item._id == s._id)
      const oldSelectedIndex = this.songs.findIndex((item) => item._id == this.selectedSong)
      this.songs[newSelectedIndex].votes++
      this.songs[oldSelectedIndex].votes--

      this.selectedSong = s._id

      await axios.post(`/api/submit/vote/${s._id}`)
    },
    playsound(sound){
      if(this.isPlaying && sound._id == this.playingSoundId){
        this.isPlaying = false
        this.playingSound.pause()
      }
      else{
        this.isPlaying = true
        this.playingSoundId = sound._id
        this.playingSound.pause()
        this.playingSound = new Audio(`data:audio/mp3;base64,${sound.songData}`)
        this.playingSound.play()

        this.playingSound.addEventListener('ended',() => {
          console.log('ended')
          this.isPlaying = false
        })
      }
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
    background-color: var(--color5);
  }

  .row{
    background-color: var(--color5);
    transition: all .1s;

    &:hover{
      background-color: var(--color4);
    }

    &:hover .box{
      fill: var(--color5) !important; 
    }
  }

  .play{
    cursor: pointer;
  }
}
</style>