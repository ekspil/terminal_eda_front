<template>
  <div class="terminal-bg">
    <div class="row">
      <div class="row col s6" id="left-block">
        <div
          class="col s12 padding"
          v-for="(item, index) of columns().left"
          :key="index"
        >
          <table>
            <thead>
              <tr>
                <th class="left-col">РЕЙС {{ item.id }}</th>
                <th>СТАТУС</th>
                <th class="icon-col"></th>
                <th>GATE</th>
              </tr>
            </thead>

            <tbody class="white-text">
              <tr v-for="(i, ind) of item.cornerReady" :key="ind">
                <td class="left-td">{{ cornerData(i.corner).name }}</td>
                <td>{{ status(i.status) }}</td>
                <td class="text-vertical-al">
                  <i
                    v-if="i.status === 'DONE'"
                    class="tiny material-icons light-green-text"
                    >airplanemode_active</i
                  >
                </td>
                <td>{{ cornerData(i.corner).gate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row col s6" id="right-block">
        <div
          class="col s12 padding"
          v-for="(item, index) of columns().right"
          :key="index"
        >
          <table>
            <thead>
              <tr>
                <th class="left-col">РЕЙС {{ item.id }}</th>
                <th>СТАТУС</th>
                <th class="icon-col"></th>
                <th>GATE</th>
              </tr>
            </thead>

            <tbody class="white-text">
              <tr v-for="(i, ind) of item.cornerReady" :key="ind">
                <td class="left-td">{{ cornerData(i.corner).name }}</td>
                <td>{{ status(i.status) }}</td>
                <td class="text-vertical-al">
                  <i
                    v-if="i.status === 'DONE'"
                    class="tiny material-icons light-green-text"
                    >airplanemode_active</i
                  >
                </td>
                <td>{{ cornerData(i.corner).gate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
    this.screenNumber = this.$route.query.screen || 1;
    this.screenNumber =Number(this.screenNumber)

    if (this.screenNumber && this.screenNumber > 1) {
      this.fistColumn = 2 * this.screenNumber - 1;
      this.secondColumn = 2 * this.screenNumber;
    }
    setInterval(async () => {
      let block = document.getElementById("left-block");
      let windowHeight = window.innerHeight;
      if (!block) return;
      let height = block.scrollHeight;
      if (height > windowHeight) {
        for (let index = this.orders.length - 1; index >= 0; index--) {
          if (
            this.orders[index].screen > this.fistColumn &&
            this.orders[index].screen < this.fistColumn
          )
            continue;
          this.orders[index].screen = this.secondColumn;
          this.$forceUpdate();
          await this.$store.dispatch("setOrderScreen", this.orders[index]);
          return;
        }
      }



      let block2 = document.getElementById("right-block");
      if (!block2) return;
      let height2 = block2.scrollHeight;
      if (height2 > windowHeight) {
        for (let index = this.orders.length - 1; index >= 0; index--) {
          if (
            this.orders[index].screen > this.secondColumn &&
            this.orders[index].screen < this.secondColumn
          )
            continue;
          this.orders[index].screen = this.secondColumn + 1;
          this.$forceUpdate();
          await this.$store.dispatch("setOrderScreen", this.orders[index]);
          return;
        }
      }
    }, 100);
  },
  sockets: {
    fullCheck(data) {
      data = data.filter(
        order => order.positions?.length > 0 && order.type !== "DELIVERY"
      );


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
    sound: null,
    screenNumber: 1,
    fistColumn: 1,
    secondColumn: 2,
    test: [
      {
        route: 123,
        cornerReady: [
          { status: "READY", corner: "pen" },
          { status: "DONE", corner: "wat" },
          { status: "NOTREADY", corner: "dug" },
          { status: "READY", corner: "bar" }
        ]
      },
      {
        route: 123,
        cornerReady: [
          { status: "READY", corner: "pen" },
          { status: "READY", corner: "bar" }
        ]
      },
      {
        route: 123,
        cornerReady: [
          { status: "READY", corner: "wat" },
          { status: "DONE", corner: "pen" },
          { status: "READY", corner: "bar" }
        ]
      },
      {
        route: 123,
        cornerReady: [
          { status: "READY", corner: "wat" },
          { status: "DONE", corner: "pen" },
          { status: "NOTREADY", corner: "dug" },
          { status: "NOTREADY", corner: "kpt" },
          { status: "NOTREADY", corner: "dug" },
          { status: "READY", corner: "bar" }
        ]
      },
      {
        route: 123,
        cornerReady: [
          { status: "READY", corner: "kpt" },
          { status: "DONE", corner: "pen" },
          { status: "NOTREADY", corner: "dug" },
          { status: "READY", corner: "bar" }
        ]
      },
      {
        route: 123,
        cornerReady: [
          { status: "READY", corner: "spa" },
          { status: "DONE", corner: "dug" },
          { status: "READY", corner: "bar" }
        ]
      }
    ]
  }),
  methods: {
    cornerData(corner) {
      switch (corner) {
        case "dug":
          return {
            name: "DOUGLAS",
            gate: "GATE D1"
          };
        case "bar":
          return {
            name: "THE BAR",
            gate: "GATE A1"
          };
        case "com":
          return {
            name: "КОМПОТ",
            gate: "GATE D3"
          };
        case "wok":
          return {
            name: "WOK&TALK",
            gate: "GATE D2"
          };
        case "bim":
          return {
            name: "BIBIMBAR",
            gate: "GATE C2"
          };
        case "pen":
          return {
            name: "PENKA",
            gate: "GATE B2"
          };
        case "spa":
          return {
            name: "SPAZIO",
            gate: "GATE A2"
          };
        case "jap":
          return {
            name: "ЯПОНИЯ",
            gate: "GATE C1"
          };
        default:
          return {
            name: "ОБЩИЙ",
            gate: "GATE Z1"
          };
      }
    },

    columns() {
      const right = this.orders.filter(i => i.screen === this.secondColumn);
      const left = this.orders.filter(i => {
        if (i.screen === this.fistColumn) return true;
        if (!i.screen && this.fistColumn === 1) return true;
        return false;
      });
      return {
        right,
        left
      };
    },
    status(status) {
      if (status === "READY" || status === "DONE") return "ПРИБЫЛ";
      return "ВЫЛЕТ";
    }
  }
};
</script>

<style scoped>
.text-vertical-al {
  display: table-cell !important;
  vertical-align: middle;
  padding: 0;
}

.tiny {
  font-size: 2.3rem;
}
.padding {
  padding-top: 10px;
}
th {
  padding: 5px;
  border-radius: 0;
  font-size: 1.2rem;
}
td {
  padding: 5px;
  border-radius: 0;
  font-size: 1.4rem;

  font-weight: bolder;
}
thead {
  background-color: #ffe442;
}
.left-col {
  width: 55%;
  font-size: 1.8rem;
  font-weight: bolder;
  padding-left: 5%;
}
.left-td {
  padding-left: 5%;
}
.icon-col {
  width: 5%;
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
.row {
  overflow: hidden;
}

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
