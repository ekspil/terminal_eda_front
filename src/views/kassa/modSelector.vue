<template>
  <div class="row height40 scroll" id="style-1">

    <div class="col s3" v-for="(item, index) of menu" :key="index">
      <div class="card-panel grey hoverable white-text" @click="add(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "positions",
  props: {
    products: {
      type: Array,
      default: () => {
        return [];
      }
    },
    mod: {
      type: Object,
      default: () => {
        return {items: []};
      }
    },
  },
  data: () => ({
    level: 1,
    selectedGroup: null,
  }),
  methods: {
    add(item) {
      this.$emit("setMod", item.id);
    }
  },
  computed: {
    menu(){
      return this.mod.items.map(i => {
        return this.products.find(item => item.id === i)
      })
    }
  }
};
</script>

<style scoped>
.height40 {
  height: 40vh;
  overflow: auto;
  background-color: #595b5d;
  margin: 0;
}
.white-text {
  font-weight: bold;
  font-family: "Helvetica Neue";
}
.card-panel {
  height: 9vh;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
