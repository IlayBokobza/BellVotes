<template>
  <div id="top-songs-graph"></div>
</template>

<script>
import * as d3 from "d3";
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
      //https://github.com/kriscfoster/d3-barchart/blob/master/index.js
      const data = this.topSongs.map((s) => {return{name:s.title,score:s.votes}})
      const topVote = Math.max(...this.topSongs.map((s) => s.votes))

      const width = document.querySelector('body').clientWidth;
      const height = 800;
      const margin = { top: 50, bottom: 50, left: 50, right: 50 };

      const svg = d3.select('#top-songs-graph')
        .append('svg')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

      const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

      const y = d3.scaleLinear()
        .domain([0, topVote])
        .range([height - margin.bottom, margin.top])

        svg
          .append("g")
          .attr("fill", '#FAC62A')
          .selectAll("rect")
          .data(data.sort((a, b) => d3.descending(a.score, b.score)))
          .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d.score))
            .attr('title', (d) => d.score)
            .attr("class", "rect")
            .attr("height", d => y(0) - y(d.score))
            .attr("width", x.bandwidth());

        function yAxis(g) {
          g.attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(null, data.format))
            .attr("font-size", '20px')

        }

        function xAxis(g) {
          g.attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => data[i].name))
            .attr("font-size", '20px')
        }

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
        svg.node();
      }
}
</script>

<style lang="scss">
  #top-songs-graph svg{
    display: block;
    margin: 0 auto;
  }
</style>