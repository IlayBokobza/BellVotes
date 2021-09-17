<template>
  <button @click="clicked">{{text}}</button>
</template>

<script>
export default {
    name:"Button",
    props:['text'],
    methods:{
        clicked(){
            this.$emit("click")
        }
    }
}
</script>

<style lang="scss" scoped>
button{
    display: block;
    color: #000;
    background-color: var(--color2);
    border: 0;
    font-size: 2rem;
    padding: .5rem 2.5rem;
    border-radius: .3rem;
    box-shadow: 3px 6px 4px 2px rgba(rgb(32, 32, 32),.5);
    transition: all .2s;
    cursor: pointer;

    &:hover{
        transform: translateY(-5px);
        box-shadow: 3px 6px 4px 4px rgba(rgb(32, 32, 32),.5);
    }

    &:active{
        transform: translateY(1px);
        box-shadow: 3px 6px 4px 1px rgba(rgb(32, 32, 32),.5);
    }
}
</style>