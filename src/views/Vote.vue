<template>
  <div class="vote" id="votes" v-if="songs.length > 0">
    <TopSongs v-if="showGraph()" :songs="songs" />  
    <!-- songs table -->
    <div class="table">
      <div class="top">
        <span>שם השיר</span>
        <span class="owner-name">הומלץ על ידי</span>
        <span>הצבעות</span>
        <span>השמעה</span>
        <span>הצבעה</span>
      </div>
      <div class="row" v-for="s in songs" :id="s._id" :key="s._id">
        <span class="song-title">{{s.title}}</span>
        <span class="owner-name">{{s.ownerName}}</span>
        <span>{{s.votes}}</span>
        <span class="material-icons play" v-if="isPlaying && s._id == playingSoundId" @click="playsound(s)">pause</span>
        <span class="material-icons play" v-else @click="playsound(s)">volume_up</span>
        <span  @click="vote(s)"><Checkbox :id="s._id" :trigger="selectedSong" /></span>
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
      playingSound:new Audio(),
      playingSoundId:null,
      isPlaying:false,
    }
  },
  created(){
    this.$store.commit('setTitle',{
      text:'הציעו שיר לפעם הבא',
      link:'/submit'
    })
  },
  methods:{
    async vote(s){
      if(this.selectedSong == s._id) return
      this.$store.commit('voteForSong',s._id)

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
          this.isPlaying = false
        })
      }
    },
    showGraph(){
      //checks if there are 5 or more songs with more then 0 votes
      let count = 0;
      
      for(let i = 0;i < this.songs.length;i++){
        if(this.songs[i].votes > 0){
          count++
        }
        if(count >= 5){
          return true
        }
      }

      return false
    }
  },
  computed:{
    songs(){
      return this.$store.state.currentSongs || []
    },
    selectedSong(){
      return this.$store.state.myVote
    }
  }
}
</script>