<template>
  <div class="submission-card">
    <!-- youtube embed -->
    <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
    <div>
      <Input text=":(01:00)הצילצול מתחיל מ"></Input>
      <div class="submission-card__btn-container">
        <button @click="accept" class="btn submission-card__btn--accept">אשר</button>
        <button @click="deny" class="btn submission-card__btn--deny">דחה</button>
        <button @click="ban" class="btn submission-card__btn--ban">חסום תלמיד</button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from './Input.vue'
export default {
    name:'submission-card',
    props:['videoId'],
    components:{
        Input,
    },
    data(){
        return{

        }
    },
    methods:{
      accept(){
        this.$emit('accept')
      },
      deny(){
        this.$emit('deny')
      },
      ban(){
        this.$emit('ban')
      },
    }
};
</script>

<style lang="scss">
.submission-card{
  background-color: var(--color2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 10px;
  padding: 2rem 0;
  margin: 0 auto;
  box-shadow: 13px 13px 14px rgba(rgb(32, 32, 32),.5);

  & > *{
    margin-bottom: 2rem;
  }

  input{
    --bg:var(--color2);
    --focus:var(--color3);
  }

  &__btn-container{
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    justify-content: space-between;
  }

  &__btn{
    &--accept{
      background-color: var(--color4) !important;
    }
    &--deny{
      background-color: var(--color5) !important;
    }
    &--ban{
      background-color: #ff0000 !important;
    }
  }
}
</style>