<template>
  <div class="vote" id="votes">
    <TopSongs/>  
  </div>
</template>

<script>
import TopSongs from '../components/TopSongs.vue'
export default {
  name:'vote',
  components:{
    TopSongs
  },
  data(){
    return {
      songs:[
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:1,votes:10},
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:2,votes:20},
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:3,votes:50},
        {videoId:'AwjhMPbeD0Y',title:'עומר אדם - חצי דפוק (Prod. by Matan Dror)',owner:'אלעאי בוקובזה',_id:4,votes:90},
      ]
    }
  },
  beforeCreate(){
    this.$store.commit('setTitle',{
      text:'הציעו שיר לפעם הבא',
      link:'/submit'
    })
  },
}
</script>