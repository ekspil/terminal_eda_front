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
    <div class="scroll " id="style-11ss">
      <div
        v-for="(item, indexBig) of bill.items"
        class="row background-color-dark2 "
        :key="indexBig"
        @click="select(item)"
        :class="{
          selected: item.code === selectedString
        }"
      >
        <div class="col s1">
          <div>{{ indexBig + 1 }}</div>
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
        <div v-if="item.items" class="col s12 row no-margin-bottom">
          <div
            class="row no-margin-bottom"
            v-for="(pos, index) of item.items"
            :key="index"
          >
            <div class="col s1">
              <div></div>
            </div>
            <div class="col s5 left-align">
              <div class="margin-left" @click="changeMod(indexBig, item.allMods[index], index)">- {{ getProd(pos).name }}</div>
            </div>
            <div class="col s2">
              <div></div>
            </div>
            <div class="col s2">
              <div></div>
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
    },
    mods: {
      type: Array,
      default: () => {
        return [];
      }
    },
    products: {
      type: Array,
      default: () => {
        return [];
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
  },
  mounted() {

    setInterval(function() {
      const elem = document.getElementById("style-11ss");
      if(!elem) return
      elem.scrollTop = elem.scrollHeight;
    }, 1000)
  },
  methods: {
    getMod(id){
      console.log(id)
      console.log(this.mods.find(i => i.id === id))
      return this.mods.find(i => i.id === id)
    },
    getProd(id){
      return this.products.find(i => i.id === id)
    },
    changeMod(productId, mod, index){
      this.$emit("changeMod", {mod, productId, index});
    },
    select(item) {
      if (this.selectedString === item.code) {
        this.selectedString = null;
        this.$emit("setString", this.selectedString);
        return;
      }
      this.selectedString = item.code;
      this.$emit("setString", this.selectedString);
    }
  }
};
</script>

<style scoped>
.text-size-large {
  font-size: xxx-large;
  font-weight: bold;
  margin-left: 20%;
}
.background-color-dark1 {
  background-color: #3c3f41;
  margin: 0;

  height: 20vh;
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

  height: 70vh; /* Высота блока */
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

#style-11ss::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #535353;
  border-radius: 10px;
  background-color: #535353;
}

#style-11ss::-webkit-scrollbar {
  width: 12px;
  background-color: #595b5d;
}

#style-11ss::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #949090;
}
</style>
