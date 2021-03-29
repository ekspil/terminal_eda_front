<template>
  <div class="height100">
    <div class="row ">
      <div class="col s12">
        <div class="card-panel hoverable  grey lighten-1 white-text ">
          {{ number }}
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('1')"
        >
          1
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('2')"
        >
          2
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('3')"
        >
          3
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('4')"
        >
          4
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('5')"
        >
          5
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('6')"
        >
          6
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('7')"
        >
          7
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('8')"
        >
          8
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('9')"
        >
          9
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="find()"
        >
          Find
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="click('0')"
        >
          0
        </div>
      </div>
      <div class="col s4">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="bksp()"
        >
          Bksp
        </div>
      </div>

      <div class="col s4 margin-top">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="plus"
        >
          +
        </div>
      </div>
      <div class="col s4 margin-top">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="minus"
        >
          -
        </div>
      </div>
      <div class="col s4 margin-top">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="del()"
        >
          Del
        </div>
      </div>
    </div>
    <div class="row ">
      <div class="col s6">
        <div class="card-panel hoverable green darken-2" @click="save()">
          Сохранить
        </div>
      </div>
      <div class="col s6">
        <div class="card-panel hoverable orange darken-2" @click="clear()">
          Очистить
        </div>
      </div>
    </div>
    <div class="row ">
      <div class="col s12">
        <div
          class="card-panel grey hoverable grey-text text-lighten-3"
          @click="newOrder()"
        >
          Новый заказ
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "actions",
  data: () => ({
    number: ""
  }),

  methods: {
    click(num) {
      this.number += num;
    },
    bksp() {
      this.number = this.number.slice(0, -1);
    },
    del() {
      this.$emit("deleteString");
    },
    minus() {
      this.$emit("minusString");
    },
    plus() {
      this.$emit("plusString");
    },
    clear() {
      this.number = "";
      this.$emit("clear");
    },
    save() {
      this.$emit("save", this.number);
    },
    find() {
      this.$emit("find", this.number);
      this.number = ""
    },
    newOrder() {
      this.$emit("newOrder");
    }
  }
};
</script>

<style scoped>
.height100 {
  height: 100vh;
  background-color: #595b5d;
}
.card-panel {
  margin: 3px;
  border: 0;
  text-align: center;
}
.margin-top {
  margin-top: 30px;
}
.white-text {
  font-size: 30px;
  font-weight: bold;
  padding: 12px;
  height: 11vh;
}
.grey-text {
  font-size: 20px;
  font-weight: bold;
  padding: 19px;
}
</style>
