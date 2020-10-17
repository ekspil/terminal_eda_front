<template>
  <form
    class="card auth-card modal modal-user"
    id="modal-user"
    @submit.prevent="save()"
  >
    <div class="card-content">
      <span class="card-title">Пользователь</span>
      <div class="input-field">
        <input id="email" type="text" v-model="user.login" />
        <label for="email">Email</label>
        <small v-if="false" class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="user.password"
        />
        <label for="password">Пароль</label>
        <small v-if="false" class="helper-text invalid">Password</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" class="validate" v-model="user.name" />
        <label for="name">Имя</label>
        <small v-if="false" class="helper-text invalid">Name</small>
      </div>
      <div class="input-field">
        <select ref="selectUserRole" v-model="user.role">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <label>Роль</label>
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
  props: ["user"],
  data: () => ({
    modal: {},
    interval: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const ok = await this.$store.dispatch("saveUser", this.user);
      if (ok) {
        this.close();
        return;
      }
      return ok;
    }
  },
  async mounted() {
    this.select = window.M.FormSelect.init(this.$refs.selectUserRole);
    window.M.updateTextFields();
  }
};
</script>

<style scoped></style>
