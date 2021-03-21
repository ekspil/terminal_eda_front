<template>
  <div class="height100 background-color-dark">
    <div class="row height100">
      <!--      Main panel-->
      <div class="col s8 height100 background-color-dark2 no-pad">
        <Postitons :bill="bill"></Postitons>
        <Menu :menu="menu" @addItem="addItem"></Menu>
      </div>

      <!--      Menu panel-->

      <div class="col s4 height100 gr" >
        <Actions ></Actions>
      </div>
    </div>
  </div>
</template>

<script>
import Postitons from "@/views/kassa/positions";
import Actions from "@/views/kassa/actions";
import Menu from "@/views/kassa/menu";

export default {
  name: "Home",
  components: {
    Actions,
    Postitons,
    Menu
  },
  async mounted() {

    this.menu = await this.$store.dispatch("getAllProducts", {});

  },
  sockets: {},
  computed: {},
  data: () => ({
    bill: {
      items: [
        { id: 1, name: "Gamburger", price: 129, count: 3 },
        { id: 3, name: "Chisburger", price: 129, count: 1, positions: [ {name: "Bulka", count: 1}, {name: "Kotleta", count: 2}, ] },
        { id: 4, name: "Coca-cola", price: 129, count: 2 },
        { id: 4, name: "Coca-cola", price: 129, count: 2 },
        { id: 4, name: "Coca-cola", price: 129, count: 2 },
        { id: 4, name: "Coca-cola", price: 129, count: 2 },
        { id: 4, name: "Coca-cola", price: 129, count: 2 },
        { id: 4, name: "Coca-cola", price: 129, count: 2 },
        { id: 6, name: "Souce", price: 129, count: 1 }
      ]
    },
    menu: []
  }),
  methods: {
    addItem(posId){
      if(this.bill && this.bill.items){
        let finded = 0
        this.bill.items.map(item => {
          if (item.id !== posId) return item
          item.count++
          finded = 1
          return item
        })
        if(finded) return
      }
      const prod = this.menu.find(item => posId === item.id)

      if(!prod) return
      const pushed = {
        count: 1,
        name: prod.name,
        price: prod.price,
        id: prod.id
      }
      if(!pushed.price) pushed.price = 9999
      this.bill.items.push(pushed)
      setTimeout(function(){
        const elem = document.getElementById('style-1')
        elem.scrollTop = elem.scrollHeight
      }, 0)

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
