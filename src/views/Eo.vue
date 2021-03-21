<template>
  <div>
    <div class="row" style="height: 1080px; margin: 0">
      <div class="col s5 center-align row">
        <div class="col s12">
          <el-image style="height: 80px" src="/notready.png" fit="contain">
          </el-image>
        </div>
        <div
          class="col s6 "
          style="margin-bottom: 5px"
          v-for="item of notready"
          :key="item.id"
        >
          <div class="bigr">{{ item.id }}</div>
          <div class="name">{{ item.guestName }}</div>
        </div>
      </div>
      <div class="col s3 center-align row">
        <div class="col s12">
          <el-image style="height: 80px" src="/ready.png" fit="contain">
          </el-image>
        </div>
        <div
          class="col s12 "
          style="margin-bottom: 5px"
          v-for="item of ready"
          :key="item.id"
        >
          <div class="bignr">{{ item.id }}</div>
          <div class="name">{{ item.guestName }}</div>
        </div>
      </div>

      <div class="col s4" style="height: 1080px; padding: 0">
        <el-carousel
          indicator-position="none"
          trigger="click"
          :interval="10000"
          style="height: 1080px"
        >
          <el-carousel-item
            v-for="item of 4"
            :key="item"
            style="height: 1080px"
          >
            <el-image
              style="height: 1080px"
              :src="'/123456' + cornerImg + '.jpg'"
              fit="fil"
            >
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  async mounted() {
    if (this.$route.params.station) {
      this.station = this.$route.params.station;
    }
    if (this.$route.params.corner) {
      this.corner = this.$route.params.corner;
    }
    await this.$store.dispatch("getOrders");
    this.sound = new Audio("/Sound.mp3");
  },
  sockets: {
    fullCheck(data) {
      if (this.corner && this.corner !== "ALL") {
        data = data.map(item => {
          item.positions = item.positions.filter(pos => {
            if (pos.corner === this.corner) return true;
            if (pos.corner === "ALL") return true;
            return false;
          });

          const isR = item.cornerReady.find(
            it => it.corner === this.corner && it.status === "READY"
          );
          if (!isR) return item;
          item.ready = 1;
          return item;
        });
        data = data.filter(order => order.positions?.length > 0);
        data = data.filter(item => {
          const isR = item.cornerReady.find(
            it => it.corner === this.corner && it.status === "DONE"
          );
          if (!isR) return true;
          return false;
        });
      }

      const nCount = data.filter(
        item => item.ready === 1 && item.type !== "DELIVERY"
      ).length;
      const oCount = this.orders.filter(
        item => item.ready === 1 && item.type !== "DELIVERY"
      ).length;
      if (nCount > oCount && this.orders) {
        this.sound.currentTime = 0;
        this.sound.play();
      }

      this.orders = data;
    }
  },
  computed: {
    ready() {
      return this.orders.filter(
        order => order.ready === 1 && order.type !== "DELIVERY"
      );
    },
    notready() {
      return this.orders.filter(
        order => order.ready === 0 && order.type !== "DELIVERY"
      );
    },
    cornerImg() {
      if (this.$route.params.corner) {
        return "_" + this.$route.params.corner.toLowerCase();
      } else {
        return "";
      }
    }
  },
  data: () => ({
    station: null,
    corner: null,
    orders: [],
    sound: null
  }),
  methods: {}
};
</script>

<style scoped>
.bigr {
  color: #2d7090;
  font-family: ‘Raleway’, sans-serif;
  font-size: 50px;
  font-weight: 800;
  line-height: 60px;
  margin: 0 0 0px;
  text-align: center;
  text-transform: uppercase;
}
.bignr {
  color: #659e13;
  font-family: ‘Raleway’, sans-serif;
  font-size: 50px;
  font-weight: 800;
  line-height: 60px;
  margin: 0 0 0px;
  text-align: center;
  text-transform: uppercase;
}
.name {
  color: #848e90;
  font-family: ‘Raleway’, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  margin: 0;
}
</style>
