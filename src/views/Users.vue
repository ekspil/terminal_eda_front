<template>
  <div>
    <div class="page-title">
      <h3>Пользователи</h3>
    </div>

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
          <tr v-for="user of users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.login}}</td>
            <td>
              <span class="white-text badge" :class="{red: user.role === 'ADMIN', green: user.role === 'USER'}">{{user.role}}</span>
            </td>
            <td>
              <button class="btn-small btn">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "Users",
  data: ()=>({
    users: null
  }),
  methods: {
  },
  async mounted() {
    this.users = await this.$store.dispatch("getAllUsers", {})
  }
};
</script>

<style scoped></style>
