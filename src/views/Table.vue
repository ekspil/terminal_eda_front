<template>
  <div>
    <div class="row">
      <div
        v-for="(order, index) of filtredOrders"
        class="col s12 m6 l4 xl3 padding-small"
        :key="index"
        @click="nextState(order)"
      >
        <div class="card bill-card" :class="{
          'amber lighten-5': ((order.type === 'IN' || order.type === 'OUT') && order.ready === 0 && order.payed === 0 && !order.die && !order.alarm ),
          'red lighten-5': ((order.type === 'IN' || order.type === 'OUT') && order.ready === 0 && order.payed === 1 && !order.die && !order.alarm ),
          'teal lighten-4': ((order.type === 'IN' || order.type === 'OUT') && order.ready === 1 && order.payed === 1 && !order.die ),
          'purple lighten-4': ((order.type === 'APP_OUT' || order.type === 'APP_IN') && order.ready === 0 && order.payed === 1 && !order.die && !order.alarm ),
          'blue lighten-4': ((order.type === 'APP_OUT' || order.type === 'APP_IN') && order.ready === 1 && order.payed === 1 && !order.die ),
          'amber lighten-1': ((order.type === 'DELIVERY') && order.ready === 0 && order.payed === 1 && !order.die && !order.alarm ),
          'light-green lighten-3': ((order.type === 'DELIVERY') && order.ready === 1 && order.payed === 1 && !order.die  ),
          'orange darken-4': (order.alarm && !order.die && !order.ready),
          'grey darken-3': (order.die),

          }">
          <div class="card-content " :class="{
            'white-text': (order.alarm || order.die)
          }">
            <div class="card-title" style="text-align: center;">
              <div class="inline" style="float: left;">{{ order.id }}</div>
              <div class="inline ">{{ order.type }}</div>
              <div class="inline" style="float: right;">
                <OrderTime :time="order"/>
              </div>
            </div>
            <div
              style="height: 240px; overflow-y: auto;"
              v-if="order.positions"
            >
              <div v-for="(pos, index) of order.positions" :key="index">
                <p>
                  <span>{{ pos.count || 1}} x </span><span>{{ pos.name }}<sup>({{pos.station}})</sup></span>
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
  import OrderTime from '@/components/OrderTime'

  import skdn from "@/filters/skdn"
export default {
  name: "Home",
  components: {
    OrderTime
  },
  mounted() {
    if (this.$route.params.station) {
      this.station = Number(this.$route.params.station)
    }
    this.$store.dispatch('getOrders')
  },
  sockets: {
    fullCheck(data) {
      this.orders = data;
    }
  },
  computed: {
    filtredOrders() {
      const stationOrders = this.orders.map(order => {
        order.positions = order.positions.filter(
          pos => !this.station || pos.station == this.station
        );
        order.positions = skdn(order.positions)
        return order;
      });
      return stationOrders.filter(order => {
        if(Number(this.station)){
          if(this.hidden.includes(order.id)) return false
                  }
        if (order.positions.length > 0) return true

      });
    }
  },
  data: () => ({
    station: null,
    orders: [],
    hidden: []
  }),
  methods:{
    async nextState(order){
      if(Number(this.station)){
        this.hidden.push(order.id)
        return
      }
      if((order.payed && order.ready) || order.die){
        order.action="DELETE"
        await this.$store.dispatch("updateOrder", order)
      }
      if(order.payed && !order.ready){
        order.ready=1
        order.action="READY"
        await this.$store.dispatch("updateOrder", order)
      }

      this.$socket.emit("fullCheck")
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
