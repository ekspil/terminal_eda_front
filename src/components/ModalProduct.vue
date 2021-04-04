<template>
  <form
    class="card auth-card modal modal-product"
    id="modal-product"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Товар</span>
      <div class="input-field">
        <input id="pname" type="text" v-model.trim="product.name" />
        <label for="pname">Наименование</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <input type="text" v-model.trim="product.code" />
        <label for="pname">Общий код</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <input type="text" v-model.trim="product.price" />
        <label for="pname">Цена</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <input type="text" v-model.trim="product.corner" />
        <label for="pname">Корнер</label>
      </div>
      <div class="input-field">
        <input
          id="Station"
          type="number"
          class="validate"
          v-model.trim="product.station"
        />
        <label for="Station">Станция</label>
        <small v-if="false" class="helper-text invalid"
          >Должно быть заполнено</small
        >
      </div>
      <div class="input-field">
        <select ref="selectprod" multiple v-model="product.items">
          <option value="" disabled selected>Выберете нужные</option>
          <option v-for="item of items" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Добавить заготовку</label>
      </div>

      <div class="input-field">
        <select ref="selectgroup" v-model="product.group_id">
          <option value="" disabled selected>Выберете нужную группу</option>
          <option v-for="item of groups" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
        <label>Группа</label>
      </div>

      <div class="input-field">
        <select ref="selectset" multiple v-model="product.mods">
          <option value="" disabled selected>Выберете состав сэта</option>
          <option v-for="item of mods" :key="item.id" :value="item.id">{{
              item.name
          }}</option>
        </select>
        <label>Состав сета</label>
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
  name: "ModalP",
  props: ["items", "product", "groups", "mods"],
  data: () => ({
    modal: {},
    select: null,
    select2: null,
    select3: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    getMod(id){
      return this.mods.find(i => i.id === id)
    },
    async save() {
      const ok = await this.$store.dispatch("saveProduct", this.product);
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
    this.select3 = window.M.FormSelect.init(this.$refs.selectset);
    window.M.updateTextFields();
  }
};
</script>

<style scoped>
.modal-product {
  overflow: visible;
}
</style>
