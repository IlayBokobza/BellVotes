<template>
  <div id="graph"></div>
</template>

<script>
import Graph from './graph'
export default {
    props:['songs'],
    computed:{
      topSongs(){
        let max1 = 0
        let max2 = 0
        let max3 = 0
        let max4 = 0
        let max5 = 0

        this.songs.forEach(n => {
          n.votes
          if (n.votes > max1) {
              max1 = n
          } else if (n.votes > max2) {
              max2 = n
          } else if (n.votes > max3) {
              max3 = n
          } else if (n.votes > max4) {
              max4 = n
          } else if (n.votes > max5) {
              max5 = n
          }
        })

        const output = [max1,max2,max3,max4,max5].filter(n => n != 0)
        return output
      }
    },
    //draw graph
    mounted(){
      console.log(this.topSongs)
      const graph = new Graph("#graph",this.topSongs,'votes',true)
      graph.draw()
    }
}
</script>

<style lang="scss">
#graph,.graph{
    width: 75%;
    margin: 0 auto;
    min-height: 30rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    @media only screen and (max-width: 980px){
      width: 95%;
    }

    @media only screen and (max-width: 730px){
      display: none;
    }

    &__col-container{
        margin: 10px;
        flex: 1;
    }
    
    &__col{
        min-height: 50px;
        background-color: var(--color2);
        border-radius: 10px;
    }

    &__text{
        text-align: center;
        display: block;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
}
</style>