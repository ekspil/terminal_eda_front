<template>
  <form
    class="card auth-card modal modal-item"
    id="modal-item"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Заготовка</span>
      <div class="input-field">
        <input id="catname" type="text" v-model="item.name" />
        <label for="catname">Наименование</label>
        <small v-if="false" class="helper-text invalid">Заготовка</small>
      </div>
      <div class="input-field">
        <input
                id="Station"
                type="number"
                class="active"
                v-model.trim="item.station"
        />
        <label for="Station">Станция</label>
        <small
                v-if="false"
                class="helper-text invalid"
        >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <input id="timeToLive" type="text" class="validate" v-model="item.liveTime" />
        <label for="timeToLive">Время жизни (мин)</label>
        <small v-if="false" class="helper-text invalid">Время жизни</small>
      </div>
      <div class="input-field">
        <input id="MinCount" type="text" class="validate" v-model="item.minCount"/>
        <label for="MinCount">Минимальное количество</label>
        <small v-if="false" class="helper-text invalid">Name</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Сохранить
          <i class="material-icons right">send</i>
        </button>
      </div>


    </div>
  </form>
</template>

<script>
export default {
  name: "Modal",
  props: ['item'],
  data: () => ({
    modal: {}
  }),
  async mounted() {

    window.M.updateTextFields();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const ok = await this.$store.dispatch("saveItem", this.item);
      if (ok) {
        this.close()
        return
      }
      return ok
    }
  }
};
</script>

<style scoped></style>
