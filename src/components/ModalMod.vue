<template>
  <form
    class="card auth-card modal modal-mod"
    id="modal-modal-mod"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Модификатор</span>
      <div class="input-field">
        <input id="pname" type="text" v-model.trim="mod.name" />
        <label for="pname">Наименование</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>

<!--      <div class="input-field">-->
<!--        <input type="text" v-model.trim="mod.price" />-->
<!--        <label for="pname">Цена</label>-->
<!--        <small v-if="false" class="helper-text invalid"-->
<!--          >Должно быть заполнено</small-->
<!--        >-->
<!--      </div>-->
      <div class="input-field">
        <select ref="selectprod" multiple v-model="mod.items">
          <option value="" disabled selected>Выберете нужные</option>
          <option v-for="item of products" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Добавить модификатор</label>
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
  name: "ModalM",
  props: ["products", "mod"],
  data: () => ({
    modal: {},
    select: null,
    select2: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const ok = await this.$store.dispatch("saveMod", this.mod);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  },
  async mounted() {
    this.select = window.M.FormSelect.init(this.$refs.selectprod);
    this.select2 = window.M.FormSelect.init(this.$refs.selectgroup);
    window.M.updateTextFields();
  }
};
</script>

<style scoped>
.modal-product {
  overflow: visible;
}
</style>
