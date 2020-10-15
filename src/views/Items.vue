<template>
  <div>
    <div class="page-title">
      <h3>Заготовки</h3>
    </div>


    <section v-if="items">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Категория</th>
            <th>Время жизни</th>
            <th>Минимальная партия</th>
            <th>Редактировать</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of items" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.liveTime}}</td>
            <td>{{item.minCount}}</td>
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
  name: "Items",
  data: ()=>({
    items: null
  }),
  methods: {
  },
  async mounted() {
    this.items = await this.$store.dispatch("getAllItems", {})
  }
};
</script>

<style scoped></style>
