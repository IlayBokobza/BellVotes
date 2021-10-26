<template>
  <div class="page-404">
      <h1>404</h1>
      <h2>סליחה אבל העמוד הזה לא קיים</h2>
      <router-link to="/" class="btn">חזרה</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.page-404{
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 14rem;
    }

    h2{
        font-size: 5rem;
        padding-bottom: 1rem;
    }
}
</style>