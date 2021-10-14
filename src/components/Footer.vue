<template>
  <footer class="footer">
      <div>
          <span>&copy; {{new Date().getFullYear()}}</span>
          <a href="https://github.com/IlayBokobza/BellVotes"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" class="github" alt="github logo"></a>
        </div>
      <div class="credit">נבנה על ידי <a href="https://ilaydev.com">אלעאי בוקובזה</a></div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.footer{
    width: 100%;
    background-color: var(--color5);
    position: absolute;
    bottom: 0;
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 2rem;

    a{
        text-decoration: underline !important;
    }

    .github{
        width: 20px;
        margin-right:1rem ;
    }

    & > *{
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row-reverse;
    }

    .credit a{
        margin: 0 5px;
    }
}
</style>