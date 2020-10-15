<template>
  <form
    class="card auth-card modal modal-item"
    id="modal-item"
    @submit.prevent="close()"
  >
    <div class="card-content">
      <span class="card-title">Заготовка</span>
      <div class="input-field">
        <input id="catname" type="text" />
        <label for="catname">Наименование</label>
        <small v-if="false" class="helper-text invalid">Заготовка</small>
      </div>
      <div class="input-field">
        <input id="timeToLive" type="text" class="validate" />
        <label for="timeToLive">Время жизни (сек)</label>
        <small v-if="false" class="helper-text invalid">Время жизни</small>
      </div>
      <div class="input-field">
        <input id="MinCount" type="text" class="validate" />
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
  data: () => ({
    modal: {}
  }),
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
