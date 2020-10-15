<template>
  <div>
    <div class="page-title">
      <h3>Продукты</h3>
    </div>

    <section v-if="products">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Категория</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of products" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>
              <span class="white-text badge red">{{item.groupId}}</span>
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
  name: "Products",
  data: ()=>({
    products: null
  }),
  methods: {
  },
  async mounted() {
    this.products = await this.$store.dispatch("getAllProducts", {})

    var elem = document.querySelector('.modal-product');
    var instance = window.M.Modal.init(elem, {});
    this.modal = instance


  }
};
</script>

<style scoped></style>
