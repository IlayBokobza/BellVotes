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
    props:['text','type'],
    data(){
        return{
            id:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
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
    margin-bottom: 1rem;
    position: relative;

    --bg:var(--color1);
    --focus:var(--color2);

    *{
        transition: all .2s;
    }

    input{
        background-color: var(--bg);
        border: 0;
        border-bottom: .4rem solid #fff;
        outline: none;
        padding: .1rem;
        width: 30rem;
        font-size: 1.6rem;

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
    }

    input:not(:placeholder-shown) + label{
        transform: translate(23%,-60%) scale(.6);
        text-decoration: underline;
    }
}
</style>