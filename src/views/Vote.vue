<template>
  <div class="vote">
    <div class="table">
      <div class="top-row">שירים</div>
      <div v-for="song in songs" :key="song._id" class="row">
        
        <a :href="`https://www.youtube.com/watch?v=${song.videoId}`">עבור לשיר</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'vote',
  data(){
    return {
      songs:[
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:1},
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:2},
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:3},
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:4},
      ]
    }
  },
  created(){
    this.$store.commit('setTitle',{
      text:'הציעו שיר לפעם הבא',
      link:'/submit'
    })
  }
}
</script>