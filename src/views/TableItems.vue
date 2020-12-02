<template>
  <div>
    <div class="row">
      <div
        v-for="(item, index) of filtreditems"
        class="col s6 m4 l3 xl2 padding-small"
        :key="index"
      >
        <div
          class="card bill-card amber lighten-1"
          :class="{
            'amber lighten-5':
              (item.type === 'IN' || item.type === 'OUT') &&
              item.ready === 0 &&
              item.payed === 0 &&
              !item.die &&
              !item.alarm,
            'red lighten-5':
              (item.type === 'IN' || item.type === 'OUT') &&
              item.ready === 0 &&
              item.payed === 1 &&
              !item.die &&
              !item.alarm,
            'teal lighten-4':
              (item.type === 'IN' || item.type === 'OUT') &&
              item.ready === 1 &&
              item.payed === 1 &&
              !item.die,
            'purple lighten-4':
              item.type === 'APP' &&
              item.ready === 0 &&
              item.payed === 1 &&
              !item.die &&
              !item.alarm,
            'blue lighten-4':
              item.type === 'APP' &&
              item.ready === 1 &&
              item.payed === 1 &&
              !item.die,
            'amber lighten-1':
              item.type === 'DELIVERY' &&
              item.ready === 0 &&
              item.payed === 1 &&
              !item.die &&
              !item.alarm,
            'light-green lighten-3':
              item.type === 'DELIVERY' &&
              item.ready === 1 &&
              item.payed === 1 &&
              !item.die,
            'orange darken-4': item.alarm && !item.die && !item.ready,
            'grey darken-3': item.die
          }"
        >
          <div
            class="card-content "
            :class="{
              'white-text': item.alarm || item.die
            }"
          >
            <div class="card-title" style="text-align: center;">
              <div class="inline" style="float: left;">{{ item.name }}</div>
              <div class="inline ">{{ item.type }}</div>
              <div class="inline" style="float: right;"></div>
            </div>
            <div style="height: 150px; overflow-y: auto;" v-if="item.lot">
              <div v-for="(pos, posIndex) of item.lot" :key="posIndex">
                <p :class="{
                  'blue-text': pos.ready && !pos.die,
                  'red-text': !pos.ready && !pos.die,
                  'black-text': pos.die,
                  'linethrough grey-text': pos.ready && pos.use >= pos.count

                }">
                  <span>[Партия {{ pos.count }} шт]: </span
                  ><span><b>Ост {{ pos.count - pos.use }} шт.</b> </span>
                  <span><b>{{pos.die?'(Списать!)':''}}</b></span>
                  <span><b>{{!pos.ready?'(Готовим!)':''}}</b></span>
                </p>
              </div>
            </div>
            <button
              v-if="inProgress(item)"
              class="btn waves-effect waves-light auth-submit "
              @click="setReady(item)"
              type="submit"
            >
              Готово
              <i class="material-icons right">star</i>
            </button>
            <br />
            <br />
            <button
              v-if="anyDie(item)"
              class="btn waves-effect waves-light auth-submit"
              type="submit"
              @click="setDie(item)"
            >
              Списать
              <i class="material-icons right">delete</i>
            </button>

            <div class="footer-copyright">
              <div class="">
                {{ item.text }}
                <a
                  v-if="item.pin"
                  class="grey-text text-lighten-4 right"
                  href="#!"
                  >PIN: {{ item.pin }}</a
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
export default {
  name: "Home",
  async mounted() {
    if (this.$route.params.station) {
      this.station = Number(this.$route.params.station)
    }
    await this.$store.dispatch("getItems");
  },
  sockets: {
    fullItems(data) {
      this.items = data;
    }
  },
  computed: {
    filtreditems() {

      return this.items.filter(
        item => !this.station || item.station == this.station
      );
    }
  },
  data: () => ({
    station: null,
    items: []
  }),
  methods: {
    inProgress(item) {
      return item.lot.find(l => !l.ready);
    },
    anyDie(item) {
      return item.lot.find(l => l.die);
    },
    async setReady(item) {
      await this.$store.dispatch("setReadyItem", item);
    },
    async setDie(item) {
      await this.$store.dispatch("setDieItem", item);
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
.linethrough {
  text-decoration: line-through;
}

</style>
