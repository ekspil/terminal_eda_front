<template>
  <form
    class="card auth-card modal modal-corner"
    id="modal-corner"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Корнер</span>
      <div id="cornerName" class="input-field">
        <input id="name" type="text" class="validate" v-model="corner.name" />
        <label for="name">Имя</label>
        <small v-if="false" class="helper-text invalid">Name</small>
      </div>
      <div class="input-field">
        <input id="uid" type="text" class="validate" v-model="corner.uid" />
        <label for="uid">Пользовательское название</label>
        <small v-if="false" class="helper-text invalid">User id</small>
      </div>
      <div class="input-field">
        <input id="gate" type="text" class="validate" v-model="corner.gate" />
        <label for="gate">Gate</label>
        <small v-if="false" class="helper-text invalid">Gate</small>
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
  props: ["corner"],
  data: () => ({
    modal: {},
    interval: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const ok = await this.$store.dispatch("saveCorner", this.corner);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  },
  async mounted() {
  }
};
</script>

<style scoped></style>
