<template>
  <div>
    <div class="row">
      <div v-for="(order, index) of orders" class="col s12 m6 l4 xl3" :key="index">
        <div class="card light-blue bill-card ">
          <div class="card-content  white-text">
            <div  class="card-title" style="text-align: center;">
              <div class="inline" style="float: left;">U-12344</div>
              <div class="inline " > Доставка</div>
              <div class="inline" style="float: right;">05:44</div>
            </div>
            <div  style="height: 250px; overflow-y: auto;">
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>

              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p><span>2 x </span><span>Бургер</span></p>
              <p>
                <small class="helper-text " style="margin-left: 10%;">
                  -Без майонеза</small
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    orders: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]
  })
};
</script>

<style scoped>
  .card-content {
    padding: 8px;
  }
  .inline {
      display: inline-block;

  }
</style>
