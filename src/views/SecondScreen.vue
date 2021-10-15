<template>
  <div id="secondScreen" class="height100 background-color-dark terminal-bg">
    <div class="row height100">
      <!--      Main panel-->
      <div v-if="bill.items.length" class="col s12 height100 background-color-dark2 no-pad">
        <Postitons
          v-if="menu && mods"
          :bill="bill"
          :mods="mods"
          :products="menu"
        ></Postitons>
      </div>
<!--      <div class="col s4 height100 gr">-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import Postitons from "@/views/kassa/positionsSS";

export default {
  name: "Home",
  components: {
    Postitons,
  },
  async mounted() {
    this.corner = this.$route.params.corner;
    this.mods = await this.$store.dispatch("getAllMods", {});
    this.menu = await this.$store.dispatch("getAllProducts", {});

    setInterval(()=>{
      this.bill = JSON.parse(localStorage.bill)
    }, 500)
  },
  sockets: {},
  computed: {
  },
  data: () => ({
    modal: null,
    modSelection: null,
    modItem: null,
    confirm: 0,
    smena: {},
    mods: null,
    groups: null,
    corners: null,
    selectedString: "",
    actionKassa: "",
    bill: {
      items: [],
      route: null,
      type: "IN",
      status: "ORDERING"
    },
    menu: [],
    corner: null
  }),
  methods: {}
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
  opacity: 100%;
  margin: 0;
}
.terminal-bg {
  background-color: #3c3f41;
  background-image: url(/terminal_bg.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;

  overflow: hidden;
}

.background-color-dark2 {
  background-color: #595b5d;
  opacity: 90%;

}
.gr {
  background-color: #595b5d;
  opacity: 0%;
}
</style>
