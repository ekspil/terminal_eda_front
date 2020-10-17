<template>
  <div>
    <div class="page-title">
      <h3>Продукты</h3>
    </div>

    <ModalProduct v-if="items" @close="refresh()" :items="items" :product="product"/>

    <section v-if="products">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Станция</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of products" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>
              <span class="white-text badge red">{{item.station}}</span>
            </td>

            <td>
              <button class="btn-small btn" @click="openModal(item)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div  class="fixed-action-btn">
      <button
              class="btn-floating btn-large blue"
              @click="openModal()"
      >
        <i class="large material-icons">add</i>
      </button>
    </div>
  </div>
</template>

<script>
import ModalProduct from "@/components/ModalProduct"
export default {
  name: "Products",
  components:{
    ModalProduct
  },
  data: ()=>({
    products: null,
    modalProduct: null,
    items: null,
    product: {
      id: null,
      name: null,
      items: [],
      station: 1
    }
  }),
  methods: {
    openModal(p){
      if(!p){
        this.product = {
          id: null,
                  name: null,
                  items: [],
                  station: 1
        }
      }
      else{
        this.product = p
      }
      this.modalProduct = window.M.Modal.init(document.querySelector('.modal-product'), {});
      this.modalProduct.open()
    },
    async refresh(){
      this.modalProduct.close()
      this.products = await this.$store.dispatch("getAllProducts", {})
    }
  },
  async beforeMount() {
    this.items = await this.$store.dispatch("getAllItems", {})
  },
  async mounted() {
    this.products = await this.$store.dispatch("getAllProducts", {})



  }
};
</script>

<style scoped></style>
