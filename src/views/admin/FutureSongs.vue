<template>
    <div class="future-songs">
        <button @click="getSongs" v-if="songs.length" class="refresh"><span class="material-symbols-outlined">refresh</span></button>
        <div v-if="songs.length" class="table">
            <div class="top">
                <span>שם השיר</span>
                <span class="owner-name">הומלץ על ידי</span>
                <span>השמעה</span>
                <span>מחיקה</span>
            </div>
            <div class="row" v-for="s in songs" :id="s._id" :key="s._id">
                <span class="song-title">{{s.title}}</span>
                <span class="owner-name">{{s.ownerName}}</span>
                <span class="material-icons play" v-if="isPlaying && s._id == playingSoundId" @click="playsound(s)">pause</span>
                <span class="material-icons play" v-else @click="playsound(s)">volume_up</span>
                <span><button class="delete-btn" @click="deleteSong(s)">מחיקה</button></span>
            </div>
        </div>
        <h2 v-else>לא אושרו שירים</h2>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name:'future-songs',
    data(){
        return{
            playingSound:new Audio(),
            playingSoundId:null,
            isPlaying:false,
        }
    },
    methods:{
        async deleteSong(s){
            const {isConfirmed} = await Swal.fire({
                title:`האם אתה רוצה למחוק את ${s.title}?`,
                icon:'warning',
                confirmButtonText:'מחק',
                cancelButtonText:'לא למחוק',
                showCancelButton:true,
                confirmButtonColor:'red',
            })

            if(!isConfirmed) return;

            await axios.delete(`/api/submit/future-songs/${s._id}`)
            this.$store.commit('removeFutureSong',s._id)
        },
        getSongs(){
            this.$store.dispatch('getFutureSongs')
        },
        playsound(sound){
            if(this.isPlaying && sound._id == this.playingSoundId){
                this.isPlaying = false
                this.playingSound.pause()
            }
            else{
                this.isPlaying = true
                this.playingSoundId = sound._id
                this.playingSound.pause()
                this.playingSound = new Audio(`data:audio/mp3;base64,${sound.songData}`)
                this.playingSound.play()

                this.playingSound.addEventListener('ended',() => {
                this.isPlaying = false
                })
            }
        },
    },
    computed:{
        songs(){
            return this.$store.state.futureSongs
        }
    }
}
</script>

<style lang="scss">
.future-songs{
    .refresh{
        background: var(--color2);
        border: none;
        border-radius: 50%;
        padding: 0.1rem;
        position: absolute;
        right: 1rem;
        cursor: pointer;
        transition: all .4s;
        transform: rotateZ(0);

        &:focus{
            transform: rotateZ(360deg);
        }

        span{
            font-size: 2rem;
            color: #000;
        }
    }
}
</style>