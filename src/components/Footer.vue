<template>
  <footer class="footer">
      <div>&copy; {{new Date().getFullYear()}}</div>
      <div>נבנה על ידי <a href="https://ilaydev.com">אלעאי בוקובזה</a></div>
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
    padding: .5rem 2rem;

    a{
        text-decoration: underline !important;
    }
}
</style>