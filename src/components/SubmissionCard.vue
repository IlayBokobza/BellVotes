<template>
  <div class="submission-card">
    <!-- youtube embed -->
    <iframe :src="`https://www.youtube.com/embed/${videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
    <div class="actions">
      <Input @newValue="updateValue" text="זמן צילצול (לדוגמה 02:42)"></Input>
      <Input @newValue="updateNameValue" :startingText="videoName" text="שם השיר"></Input>
      <div class="submission-card__btn-container">
        <button @click="accept" class="btn submission-card__btn--accept">אשר</button>
        <button @click="deny" class="btn submission-card__btn--deny">דחה</button>
        <button @click="ban" class="btn submission-card__btn--ban">חסום תלמיד</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Input from './Input.vue'
export default {
    name:'submission-card',
    props:['videoId','videoName'],
    components:{
        Input,
    },
    data(){
        return{
          timevalue:'',
          nameValue:this.videoName
        }
    },
    methods:{
      updateValue(v){
        this.timevalue = v
      },
      updateNameValue(v){
        this.nameValue = v
      },
      accept(){
        //check for invalid time stamp
        if(!/[0-9][0-9]:[0-5][0-9]/.test(this.timevalue) && !/[0-9][0-9]:60/.test(this.timevalue)){
          Swal.fire({
            title:'זמן לא תקין',
            text:'הזמן צריך לראות ככה "שניות:דקות". לדוגמה: 01:53.',
            icon:'error',
          })

          return
        }

        //check for no name
        if(!this.nameValue){
          Swal.fire({
            title:'לא ניתן שם',
            icon:'error',
          })

          return
        }

        this.$emit('accept',{time:this.timevalue,name:this.nameValue})
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

  @media only screen and (max-width: 1050px){
    width: 75%;
  }

  @media only screen and (max-width: 570px){
    width: 90%;
  }

  & > *{
    margin-bottom: 2rem;
  }

  & *::selection{
    background-color: var(--color1);
  }

  iframe{
    width: 60%;
    //19.68rem = 20px
    height: 19.68rem;

    @media only screen and (max-width: 730px){
      width: 75%;
    }
    
    @media only screen and (max-width: 480px){
      height: 15rem;
    }
  }

  input{
    --bg:var(--color2);
    --focus:var(--color3);
    border-bottom: .4rem solid var(--color5);
  }

  label,input{
    color: var(--color5) !important;
  }

  .actions{
    width: 75%;
  }

  &__btn-container{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;

    @media only screen and (max-width: 730px){
      flex-direction: column;

      .btn:not(:last-child){
        margin-bottom: 1rem;
      }
    }
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