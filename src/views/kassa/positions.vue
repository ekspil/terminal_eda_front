<template>
  <div>
    <div class="row background-color-dark1">
      <div class="col s8">
        <div>Рейс</div>
        <div class="text-size-large">{{ bill.route }}</div>
      </div>
      <div class="col s4">
        <div>К оплате</div>
        <div class="text-size-large">{{ sum }}</div>
      </div>
    </div>
    <div class="row background-color-dark2-header">
      <div class="col s1">
        <div>№</div>
      </div>
      <div class="col s5">
        <div>Товар</div>
      </div>
      <div class="col s2">
        <div>Цена</div>
      </div>
      <div class="col s2">
        <div>Кол-во</div>
      </div>
      <div class="col s2">
        <div>Сумма</div>
      </div>
    </div>
    <div class="scroll " id="style-1">
      <div
        v-for="(item, index) of bill.items"
        class="row background-color-dark2 "
        :key="index"
        @click="selectedString = item.id"
        :class="{
          'selected': item.id === selectedString
        }"
      >
        <div class="col s1">
          <div>{{ index + 1 }}</div>
        </div>
        <div class="col s5 left-align">
          <div>{{ item.name }}</div>
        </div>
        <div class="col s2">
          <div>{{ item.price }}</div>
        </div>
        <div class="col s2">
          <div>{{ item.count }}</div>
        </div>
        <div class="col s2">
          <div>{{ item.count * item.price }}</div>
        </div>
        <div v-if="item.positions" class="col s12 row no-margin-bottom">
          <div
            class="row no-margin-bottom"
            v-for="(pos, index) of item.positions"
            :key="index"
          >
            <div class="col s1">
              <div></div>
            </div>
            <div class="col s5 left-align">
              <div class="margin-left">- {{ pos.name }}</div>
            </div>
            <div class="col s2">
              <div></div>
            </div>
            <div class="col s2">
              <div>{{ pos.count }}</div>
            </div>
            <div class="col s2">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "positions",
  props: {
    bill: {
      type: Object,
      default: () => {
        return { items: [] };
      }
    }
  },
  data: () => ({
    selectedString: null
  }),
  computed: {
    sum() {
      return this.bill.items.reduce((acc, item) => {
        return (acc += item.count * item.price);
      }, 0);
    }
  }
};
</script>

<style scoped>
.text-size-large {
  font-size: large;
  font-weight: bold;
  margin-left: 20%;
}
.background-color-dark1 {
  background-color: #3c3f41;
  margin: 0;

  height: 9vh;
}
.background-color-dark2-header {
  background-color: #595b5d;
  padding: 0;
  margin: 0;
  height: 5vh;
  text-align: center;
}
.background-color-dark2 {
  background-color: #595b5d;
  padding: 5px;
  margin-bottom: 0;
}
.selected {
  background-color: #727777;
  padding: 5px;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;

  height: 46vh; /* Высота блока */
}
.no-margin-bottom {
  margin-bottom: 0;
}
.margin-left {
  margin-left: 20%;
}
/*
 *  STYLE 1
 */

#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #535353;
  border-radius: 10px;
  background-color: #535353;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #595b5d;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #949090;
}
</style>
