<template>
  <h3>Waiting...</h3>
</template>

<script>
export default {}
</script>

<style scoped>

h3 {
  font-size: 4vh;
  margin-bottom: 3vh;
}

img {
  transform: scale(0.9);
}

@media screen and (max-device-width: 480px) {
  img {
    transform: scale(0.55);
    position: relative;
    right: 60px;
  }
}

</style>