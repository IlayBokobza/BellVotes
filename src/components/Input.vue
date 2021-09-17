<template>
    <div class="input">
        <input :id="id" :type="(type) ? type : 'text'" placeholder=" ">
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
            id:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
    },
})
</script>

<style lang="scss">
.input{
    padding: 10px;
    margin-bottom: 1rem;

    *{
        transition: all .2s;
    }

    input{
        background-color: var(--color1);
        border: 0;
        border-bottom: .4rem solid #fff;
        outline: none;
        padding: .1rem;
        width: 30rem;
        font-size: 1.6rem;

        &:focus{
            border-bottom: .4rem solid var(--color2);
        }
    }

    label{
        font-size: 2rem;
        position: relative;
        display: inline-block;
        left: -9rem;
    }

    input:not(:placeholder-shown) + label{
        transform: translate(23%,-60%) scale(.6);
        text-decoration: underline;
    }
}
</style>