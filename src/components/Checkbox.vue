<template>
  <div class="inner">
    <input type="checkbox" name="cb" :id="inputId" />
    <label :for="inputId" :id="svgId">
      <svg viewBox="0 0 100 100">
        <path
          class="box"
          d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"
        />
        <polyline class="check" points="25.5,53.5 39.5,67.5 72.5,34.5 " />
      </svg>
    </label>
  </div>
</template>

<script>
// https://codepen.io/designcourse/pen/KKwovgX
export default {
    props:['id','trigger'],
    name: "checkbox",
    data() {
        return {
            inputId: Math.random().toString(36).substring(2, 15),
            svgId: Math.random().toString(36).substring(2, 15),
        };
    },
    mounted(){
        // console.log(this.id,this.trigger,this.id  === this.trigger)
        this.setBox(this.id  === this.trigger)
    },
    methods: {
        setBox(val) {
            const checkbox = document.getElementById(this.inputId);
            const svg = document.getElementById(this.svgId)

            if (val){
                svg.classList.add("reverse")
                checkbox.checked = true
                checkbox.disabled = true
            }
            else{
                svg.classList.remove("reverse");
                checkbox.checked = false
                checkbox.disabled = false
            }
        },
    },
    watch:{
        trigger(selectedSong){
            this.setBox(selectedSong == this.id)
        }
    }
};
</script>

<style lang="scss">
input[type=checkbox] {
    display: none;
    pointer-events: none;

    & + label {
        cursor: pointer;
        font-size: .8em;
        display: grid;
        grid-template-columns: auto 3fr;

        svg {
            width: 2em;
            stroke: var(--color2);
            stroke-width: 5;
            fill: red;

            .box {
                stroke-dasharray: 320;
                stroke-dashoffset: 320;
                transition: all .1s;
                fill: var(--color4) !important;
            }
            .check {
                stroke-dasharray: 70;
                stroke-dashoffset: 70;
                fill: none;
            }
        }

        span {
            padding-top: .3em;
            margin-left: .3em;
        }
    }

    &:checked + label {
        .box {
            stroke-dashoffset: 320;
            transition: stroke-dashoffset .3s linear;
        }
        .check {
            stroke-dashoffset: 0;
            transition: stroke-dashoffset .3s linear;
        }
    }
}

.reverse {
    .box {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset .3s linear;
    }
    .check {
        stroke-dashoffset: 70;
        transition: stroke-dashoffset .3s linear;
    }
}
</style>