<template>
  <div>
    <div class="row">
      <div
        v-for="(order, index) of filtredOrders"
        class="col s6 m4 l3 xl2 padding-small"
        :key="index"
        @click="nextState(order)"
      >
        <div
          class="card bill-card"
          :class="{
            'amber lighten-5':
              (order.type === 'IN' || order.type === 'OUT') &&
              order.ready === 0 &&
              order.payed === 0 &&
              !order.die &&
              !order.alarm,
            'red lighten-5':
              (order.type === 'IN' || order.type === 'OUT') &&
              order.ready === 0 &&
              order.payed === 1 &&
              !order.die &&
              !order.alarm,
            'teal lighten-4':
              (order.type === 'IN' || order.type === 'OUT') &&
              order.ready === 1 &&
              order.payed === 1 &&
              !order.die,
            'purple lighten-4':
              (order.type === 'APP_OUT' || order.type === 'APP_IN') &&
              order.ready === 0 &&
              order.payed === 1 &&
              !order.die &&
              !order.alarm,
            'blue lighten-4':
              (order.type === 'APP_OUT' || order.type === 'APP_IN') &&
              order.ready === 1 &&
              order.payed === 1 &&
              !order.die,
            'amber lighten-1':
              order.type === 'DELIVERY' &&
              order.ready === 0 &&
              order.payed === 1 &&
              !order.die &&
              !order.alarm,
            'light-green lighten-3':
              order.type === 'DELIVERY' &&
              order.ready === 1 &&
              order.payed === 1 &&
              !order.die,
            'orange darken-4': order.alarm && !order.die && !order.ready,
            'grey darken-3': order.die
          }"
        >
          <div
            class="card-content "
            :class="{
              'white-text': order.alarm || order.die
            }"
          >
            <div class="card-title" style="text-align: center;">
              <div class="inline" style="float: left;">{{ order.id }}</div>
              <div class="inline ">{{ order.type }}</div>
              <div class="inline" style="float: right;">
                <OrderTime :time="order" />
              </div>
            </div>
            <div
              style="height: 240px; overflow-y: auto;"
              v-if="order.positions"
            >
              <div v-for="(pos, index) of order.positions" :key="index">
                <p>
                  <span>{{ pos.count || 1 }} x </span
                  ><span
                    >{{ pos.name }}<sup>({{ pos.station }})</sup></span
                  >
                </p>
                <p v-for="(mod, index) of pos.mods" :key="index">
                  <small class="helper-text " style="margin-left: 10%;">
                    -{{ mod.name }}</small
                  >
                </p>
              </div>
            </div>

            <div class="footer-copyright">
              <div class="">
                {{ order.text }}
                <a
                  v-if="order.pin"
                  class="grey-text text-lighten-4 right"
                  href="#!"
                  >PIN: {{ order.pin }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderTime from "@/components/OrderTime";

import skdn from "@/filters/skdn";
export default {
  name: "Home",
  components: {
    OrderTime
  },
  mounted() {
    if (this.$route.params.station) {
      this.station = Number(this.$route.params.station);
    }
    if (this.$route.params.corner) {
      this.corner = this.$route.params.corner;
    }
    this.$store.dispatch("getOrders");
  },
  sockets: {
    fullCheck(data) {
      if (this.corner && this.corner !== "ALL" && this.station == 0) {
        data = data.map(item => {
          const isR = item.cornerReady.find(
            it => it.corner === this.corner && it.status === "READY"
          );
          if (!isR) return item;
          item.ready = 1;
          return item;
        });
        data = data.filter(item => {
          const isR = item.cornerReady.find(
            it => it.corner === this.corner && it.status === "DONE"
          );
          if (!isR) return true;
          return false;
        });
      }
      this.orders = data;
    }
  },
  computed: {
    filtredOrders() {
      const stationOrders = this.orders.map(order => {
        order.positions = order.positions.filter(
          pos => !this.station || pos.station == this.station
        );

        if (this.corner && this.corner !== "ALL") {
          order.positions = order.positions.filter(pos => {
            if (pos.corner === this.corner) return true;
            if (pos.corner === "ALL") return true;
            return false;
          });
        }
        order.positions = skdn(order.positions);
        return order;
      });
      return stationOrders.filter(order => {
        if (this.station) {
          if (order.hidden.includes(this.station)) return false;
        }
        if (this.corner && this.corner != "ALL" && this.station === 0) {
          const isR = order.cornerReady.find(
            it => it.corner === this.corner && it.status === "DONE"
          );
          if (isR) return false;
        }
        if (order.positions.length > 0) return true;
      });
    }
  },
  data: () => ({
    station: null,
    corner: null,
    orders: []
  }),
  methods: {
    async nextState(order) {
      if (this.station === 0 && this.corner && this.corner !== "ALL") {
        if (order.ready === 1) {
          order.cornerReady.map(i => {
            if(i.corner === this.corner) {
              i.status = "DONE"
            }
            return i
          });
          await this.$store.dispatch("updateOrderHidden", {
            station: this.station,
            orderId: order.id,
            corner: this.corner,
            status: "DONE"
          });
          if (order.type === "APP_OUT") {
            await this.$store.dispatch("sendStatus", {
              orderId: order.id,
              status: "done"
            });
          }

          return;
        }
        order.cornerReady.map(i => {
          if(i.corner === this.corner) {
            i.status = "READY"
          }
          return i
        });
        order.ready = 1;
        await this.$store.dispatch("updateOrderHidden", {
          station: this.station,
          orderId: order.id,
          corner: this.corner,
          status: "READY"
        });
        if (order.type === "APP_OUT") {
          await this.$store.dispatch("sendStatus", {
            orderId: order.id,
            status: "cooked"
          });
        }
        return;
      }
      if (this.station) {
        await this.$store.dispatch("updateOrderHidden", {
          station: this.station,
          orderId: order.id
        });
        order.hidden.push(this.station);
        return;
      }
      if ((order.payed && order.ready) || order.die) {
        order.action = "DELETE";
        if (order.type === "APP_IN" || order.type === "APP_OUT") {
          await this.$store.dispatch("sendStatus", {
            orderId: order.id,
            status: "done"
          });
        }
        if (order.type === "DELIVERY") {
          await this.$store.dispatch("sendStatus", {
            orderId: order.id,
            status: "sent"
          });
        }
        await this.$store.dispatch("updateOrder", order);
        return;
      }
      if (order.payed && !order.ready) {
        order.ready = 1;
        order.action = "READY";
        if (
          order.type === "APP_IN" ||
          order.type === "APP_OUT" ||
          order.type === "DELIVERY"
        ) {
          await this.$store.dispatch("sendStatus", {
            orderId: order.id,
            status: "cooked"
          });
        }
        await this.$store.dispatch("updateOrder", order);
        return;
      }
    }
  }
};
</script>

<style scoped>
.card-content {
  padding: 8px;
}
.padding-small {
  padding: 0 3px 0 3px;
}
.inline {
  display: inline-block;
}
.card {
  margin: 3px 0 3px 0;
}
</style>
