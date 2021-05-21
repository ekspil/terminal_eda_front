<template>
  <div class="height100 background-color-dark">
    <div class="row height100">
      <!--      Main panel-->
      <div class="col s8 height100 background-color-dark2 no-pad">
        <Postitons
          v-if="menu && mods"
          :bill="bill"
          :mods="mods"
          :products="menu"
          @setString="setString"
          @changeMod="changeMod"
        ></Postitons>
        <Menu
          v-if="menu && groups && !modSelection && !actionKassa"
          :products="menu"
          :groups="groups"
          @addItem="addItem"

        ></Menu>
        <ModSelector
          v-if="menu && modSelection && !actionKassa"
          :products="menu"
          :mod="modSelection"
          @setMod="setMod"
        ></ModSelector>
      </div>

      <!--      Menu panel-->

      <div class="col s4 height100 gr">
        <Actions
          :smena="smena"
          :bill="bill"
          :corner="corner"
          :actionKassa="actionKassa"
          @clear="clear"
          @deleteString="deleteString()"
          @minusString="minusString"
          @plusString="plusString"
          @newOrder="newOrder()"
          @save="save()"
          @find="find"
          @setAction="setActionKassa"
        ></Actions>
      </div>
    </div>
    <ModalConfirm></ModalConfirm>
  </div>
</template>

<script>
import Postitons from "@/views/kassa/positions";
import Actions from "@/views/kassa/actions";
import Menu from "@/views/kassa/menu";
import ModalConfirm from "@/views/kassa/modalConfirm";
import ModSelector from "@/views/kassa/modSelector";

export default {
  name: "Home",
  components: {
    Actions,
    Postitons,
    Menu,
    ModalConfirm,
    ModSelector
  },
  async mounted() {
    this.corner = this.$route.params.corner;
    this.mods = await this.$store.dispatch("getAllMods", {});
    this.menu = await this.$store.dispatch("getAllProducts", {});
    this.smena = await this.$store.dispatch("getLastSmena");
    const groups = await this.$store.dispatch("getAllGroups", {});
    this.groups = groups.map(i => {
      i.group = true;
      return i;
    });
  },
  sockets: {},
  computed: {},
  data: () => ({
    modal: null,
    modSelection: null,
    modItem: null,
    confirm: 0,
    smena: {},
    mods: null,
    groups: null,
    selectedString: "",
    actionKassa: "",
    bill: {
      items: [
        //   {
        //     id: 1,
        //     name: "Gamburger",
        //     price: 129,
        //     count: 3,
        //     corner: "KPT",
        //     code: "СВ-098"
        //   },
        //   {
        //     id: 3,
        //     name: "Chisburger",
        //     price: 129,
        //     count: 1,
        //     corner: "KPT",
        //
        //     positions: [
        //       { name: "Bulka", count: 1 },
        //       { name: "Kotleta", count: 2 }
        //     ],
        //     code: "СВ-095"
        //   },
        //   {
        //     id: 4,
        //     name: "Coca-cola",
        //     price: 129,
        //     count: 2,
        //     corner: "KPT",
        //     code: "СВ-096"
        //   },
        //   {
        //     id: 6,
        //     name: "Souce",
        //     price: 129,
        //     count: 1,
        //     corner: "KPT",
        //     code: "СВ-097"
        //   }
      ],
      route: null,
      type: "IN",
      status: "ORDERING"
    },
    menu: [],
    corner: null
  }),
  methods: {
    setActionKassa(value) {
      this.actionKassa = value;
    },
    changeMod(data) {
      const { productId, mod, index } = data;
      console.log(data);
      this.modSelection = mod;
      this.modSelection.index = index;
      this.modItem = productId;
      //console.log(this.mods.find(i=> i.id === mod.id))
      //console.log(this.bill.items.find(i=> i.id === productId))
    },
    setMod(productId) {
      this.bill.items = this.bill.items.map((item, index) => {
        if (index !== this.modItem) return item;
        item.items[this.modSelection.index] = productId;
        item.changed = true;
        return item;
      });
      this.modSelection = null;
      this.modItem = null;
    },

    getProd(id) {
      return this.menu.find(i => i.id === id);
    },
    deleteString() {
      if (!this.selectedString) return;
      this.bill.items = this.bill.items.filter(
        i => i.code !== this.selectedString
      );
    },
    plusString() {
      if (!this.selectedString) return;
      this.bill.items = this.bill.items.map(i => {
        if (i.code == this.selectedString) i.count++;
        return i;
      });
    },
    minusString() {
      if (!this.selectedString) return;
      let ds = false;
      this.bill.items = this.bill.items.map(i => {
        if (i.code == this.selectedString) i.count--;
        if (i.count === 0) ds = true;
        return i;
      });
      if (ds) {
        this.bill.items = this.bill.items.filter(
          i => i.code !== this.selectedString
        );
        this.selectedString = null;
      }
    },
    setString(string) {
      this.selectedString = string;
    },
    async newOrder() {
      if (this.bill.route) this.clear();
      const result = await this.$store.dispatch("newOrderKassa", {});
      this.bill.route = result.route;
      this.bill.type = result.type;
      this.bill.status = result.status;
    },
    async save() {
      this.actionKassa = "WAIT";
      const body = {
        ...this.bill,
        printer: Number(this.$route.query.printer)
      };
      await this.$store.dispatch("updateOrderKassa", body);
      this.clear(true);
    },
    async find(number, status) {
      this.clear(true);
      const result = await this.$store.dispatch("findOrderKassa", number);
      if (result.error) {
        alert(result.error);
        return;
      }
      if (result.status === "PAYED" && status !== "PAYED") {
        alert("Заказ уже оплачен!");
        return;
      }
      if (result.status === "CANCELED" && status !== "CANCELED") {
        alert("Заказ отменен!");
        return;
      }

      this.bill.route = result.route;
      this.bill.type = result.type;
      this.bill.status = result.status;
      this.bill.payType = result.payType;
      this.bill.RRNCode = result.RRNCode;
      this.bill.AuthorizationCode = result.AuthorizationCode;
      for (let pos of result.items) {
        this.addItem(pos.item_id, pos);
      }
    },
    clear(notAsk) {
      if (!notAsk) {
        if (
          !confirm("Вы уверены, что хотите очистить несохраненные изменения?")
        )
          return;
      }

      this.bill = {
        items: [],
        route: null,
        type: null
      };
      if(!this.actionKassa.includes('RETURN')){
        this.actionKassa = "";
      }
      this.selectedString = "";
    },
    addItem(posId, position) {
      if (!this.bill || !this.bill.route) {
        alert("Не выбран маршрут!");
        return;
      }
      if (this.bill && this.bill.items && !position) {
        let finded = 0;
        this.bill.items.map(item => {
          if (item.code !== posId) return item;
          if (item.changed) return item;
          item.count++;
          finded = 1;
          return item;
        });
        if (finded) return;
      }

      const prod = this.menu.find(item => {
        if (posId === item.code && !position) return true;
        if (posId === item.id && position) return true;
        return false;
      });

      if (!prod) return;
      const allMods = prod.mods.map(item => {
        let mod = this.mods.find(i => i.id === item);
        return mod;
      });
      let selectedMods = allMods.map(item => {
        if (item.items.length) return item.items[0];
        throw new Error("Неверно заполнены данные сэта");
      });
      if (position) {
        selectedMods = position.items;
      }
      const pushed = {
        count: 1,
        id: prod.id,
        name: prod.name,
        price: prod.price,
        corner: prod.corner,
        code: prod.code,
        items: selectedMods,
        allMods,
        station: prod.station
      };
      if (position) {
        pushed.changed = position.changed;
        pushed.count = position.count;
      }
      if (!pushed.price) pushed.price = 0;
      this.bill.items.push(pushed);
      setTimeout(function() {
        const elem = document.getElementById("style-1");
        elem.scrollTop = elem.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style scoped>
.height100 {
  height: 100vh;
}
.no-pad {
  padding: 0;
}
.height60 {
  height: 60vh;
  padding: 0;
}
.background-color-dark {
  color: #bbbbbb;
  background-color: #2b2b2b;

  margin: 0;
}

.background-color-dark2 {
  background-color: #595b5d;
}
.gr {
  background-color: #595b5d;
}
</style>
