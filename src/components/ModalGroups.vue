<template>
  <form
    class="card auth-card modal modal-groups"
    id="modal-groups"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Группа</span>
      <div class="input-field">
        <input id="catname" type="text" v-model="group.name" />
        <label for="catname">Наименование</label>
        <small v-if="false" class="helper-text invalid">Наименование</small>
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
  props: ['group'],
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
      const ok = await this.$store.dispatch("saveGroup", this.group);
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
