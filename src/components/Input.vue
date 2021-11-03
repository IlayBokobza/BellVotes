<template>
    <div class="input">
        <input @keyup="updateValue" v-model="value" :id="id" :type="(type) ? type : 'text'" placeholder=" ">
        <label :for="id">{{text || 'temp text'}}</label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"Input",
    props:['text','type','startingText'],
    created(){
        this.value = this.startingText
    },
    data(){
        return{
            id:Math.random().toString(36).substring(2, 15),
            value:null
        }
    },
    methods:{
        updateValue(){
            this.$emit('newValue',this.value)
        }
    }
})
</script>

<style lang="scss">
.input{
    padding: 10px;
    padding-bottom:0 ;
    margin-bottom: 1rem;
    position: relative;
    width: 100%;

    --bg:var(--color1);
    --focus:var(--color2);

    *{
        transition: all .2s;
    }

    input{
        background-color: var(--bg);
        border: 0;
        width: 100%;
        outline: none;
        padding: .1rem;
        font-size: 1.6rem;
        text-align: right;
        padding-top: 10px;

        border-bottom: .4rem solid #fff;

        &:focus{
            border-bottom: .4rem solid var(--focus);
        }
    }

    label{
        font-size: 2rem;
        position: absolute;
        display: inline-block;
        width: 200px;
        text-align: right;
        right: 2%;
        user-select: none;
        pointer-events: none;
    }

    input:not(:placeholder-shown) + label{
        transform: translate(23%,-60%) scale(.6);
        text-decoration: underline;
    }
}
</style>