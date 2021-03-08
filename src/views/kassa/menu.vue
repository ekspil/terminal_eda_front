<template>
  <div class="row height40">
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер super puper</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
    <div class="col s3">
      <div class="card-panel grey hoverable">Роялбургер</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "positions",
  props: {
    menu: {
      type: Object,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.height40 {
  height: 40vh;
  overflow: hidden;
  background-color: #595b5d;
}
.card-panel {
  height: 10vh;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
