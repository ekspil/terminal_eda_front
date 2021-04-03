<template>
  <div class="height100 background-color-dark">
    <div class="row height100">
      <!--      Main panel-->
      <div class="col s8 height100 background-color-dark2 no-pad">
        <Postitons :bill="bill" @setString="setString"></Postitons>
        <Menu
          v-if="menu && groups"
          :products="menu"
          :groups="groups"
          @addItem="addItem"
        ></Menu>
      </div>

      <!--      Menu panel-->

      <div class="col s4 height100 gr">
        <Actions v-if="!actionKassa"
          :bill="bill"
          :corner="corner"
          @clear="clear"
          @deleteString="deleteString()"
          @minusString="minusString"
          @plusString="plusString"
          @newOrder="newOrder()"
          @save="save()"
          @find="find"
        ></Actions>
        <div v-else>
          Ожидание завершения операции
        </div>
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

export default {
  name: "Home",
  components: {
    Actions,
    Postitons,
    Menu,
    ModalConfirm
  },
  async mounted() {
    this.corner = this.$route.params.corner;
    this.menu = await this.$store.dispatch("getAllProducts", {});
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
    confirm: 0,
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
      this.actionKassa = "WAIT"
      const body = {
        ...this.bill,
        printer: Number(this.$route.query.printer)
      };
      await this.$store.dispatch("updateOrderKassa", body);
      this.clear(true);
    },
    async find(number) {
      const result = await this.$store.dispatch("findOrderKassa", number);
      if (result.error) {
        alert(result.error);
        return;
      }
      if(result.status === "PAYED"){
        alert("Заказ уже оплачен!")
        return
      }
      this.bill = result;
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
      this.actionKassa = ""
      this.selectedString = "";
    },
    addItem(posId) {
      if (!this.bill || !this.bill.route) {
        alert("Не выбран маршрут!");
        return;
      }
      if (this.bill && this.bill.items) {
        let finded = 0;
        this.bill.items.map(item => {
          if (item.code !== posId) return item;
          item.count++;
          finded = 1;
          return item;
        });
        if (finded) return;
      }
      const prod = this.menu.find(item => posId === item.code);

      if (!prod) return;
      const pushed = {
        count: 1,
        name: prod.name,
        price: prod.price,
        corner: prod.corner,
        code: prod.code
      };
      if (!pushed.price) pushed.price = 9999;
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
