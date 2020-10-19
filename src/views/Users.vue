<template>
  <div>
    <div class="page-title">
      <h3>Пользователи</h3>
    </div>


    <ModalUsers @close="refresh()" :user="user"/>

    <section v-if="users">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Логин</th>
            <th>Роль</th>
            <th>Редактировать</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="us of users" :key="us.id">
            <td>{{ us.id }}</td>
            <td>{{ us.name }}</td>
            <td>{{ us.login }}</td>
            <td>
              <span
                class="white-text badge"
                :class="{
                  red: us.role === 'ADMIN',
                  green: us.role === 'USER'
                }"
                >{{ us.role }}</span
              >
            </td>
            <td>
              <button class="btn-small btn" @click="openModal(us)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <div class="fixed-action-btn">
      <button class="btn-floating btn-large blue" @click="openModal()">
        <i class="large material-icons">add</i>
      </button>
    </div>
  </div>
</template>

<script>
import ModalUsers from "@/components/ModalUser";
export default {
  name: "Users",
  components: {
    ModalUsers
  },
  data: () => ({
    modalUser: null,
    users: null,
    user: {
      id: null,
      name: null,
      login: null,
      password: null,
      role: null
    }
  }),
  methods: {
    openModal(i) {
      if (!i) {
        this.user = {
          id: null,
          name: null,
          login: null,
          password: null,
          role: null
        };
      } else {
        this.user = i;
      }
      this.modalUser = window.M.Modal.init(
        document.querySelector(".modal-user"),
        {}
      );

      this.modalUser.open();

    },
    async refresh() {
      this.modalUser.close();
      this.users = await this.$store.dispatch("getAllUsers", {});
    }
  },
  async mounted() {
    this.users = await this.$store.dispatch("getAllUsers", {});
    window.M.updateTextFields();
  }
};
</script>

<style scoped></style>
