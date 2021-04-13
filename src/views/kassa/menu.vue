<template>
  <div class="row height40 scroll" id="style-1">
    <div class="col s3" v-if="selectedGroup">
      <div
        class="card-panel orange lighten-2 hoverable white-text"
        @click="back()"
      >
        Назад
      </div>
    </div>
    <div class="col s3" v-else-if="selectedCorner">
      <div
        class="card-panel orange lighten-2 hoverable white-text"
        @click="backCorner()"
      >
        Назад
      </div>
    </div>
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
    groups: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: () => ({
    level: 1,
    selectedGroup: null,
    selectedCorner: null
  }),
  methods: {
    back() {
      this.selectedGroup = null;
    },
    backCorner() {
      this.selectedCorner = null;
    },
    add(item) {
      if (item.group) {
        this.selectedGroup = item.id;
        return;
      }
      if (item.gate) {
        this.selectedCorner = item.id;
        return;
      }
      this.$emit("addItem", item.code);
    }
  },
  computed: {
    menu() {

      if (this.$route.params.corner === "KASSA") {
        if (!this.selectedCorner) {
          return [
            {
              id: "dug",
              name: "DOUGLAS",
              gate: "GATE D1"
            },
            {
              id: "bar",
              name: "THE BAR",
              gate: "GATE A1"
            },
            {
              id: "com",
              name: "КОМПОТ",
              gate: "GATE D3"
            },
            {
              id: "wok",
              name: "WOK&TALK",
              gate: "GATE D2"
            },
            {
              id: "bim",
              name: "BIBIMBAR",
              gate: "GATE C2"
            },
            {
              id: "pen",
              name: "PENKA",
              gate: "GATE B2"
            },
            {
              id: "spa",
              name: "SPAZIO",
              gate: "GATE A2"
            },
            {
              id: "jap",
              name: "ЯПОНИЯ",
              gate: "GATE C1"
            }
          ];
        }
        const filtredProducts = this.products.filter(prod => {
          if (prod.corner === this.selectedCorner) return true;
          return false;
        });
        if (!this.selectedGroup) {
          return this.groups.filter(group => {
            const p = filtredProducts.find(i => i.group_id === group.id);
            if (!p) return false;
            return true;
          });
        } else {
          return filtredProducts.filter(p => p.group_id === this.selectedGroup);
        }


      }

      const filtredProducts = this.products.filter(prod => {
        if (prod.corner === this.$route.params.corner) return true;
        if (this.$route.params.corner === "KASSA") return true;
        return false;
      });
      if (!this.selectedGroup) {
        return this.groups.filter(group => {
          const p = filtredProducts.find(i => i.group_id === group.id);
          if (!p) return false;
          return true;
        });
      } else {
        return filtredProducts.filter(p => p.group_id === this.selectedGroup);
      }
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
