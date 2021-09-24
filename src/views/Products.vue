<template>
  <div>
    <div>
      <table>
        <tbody>
        <tr class="page-title">
          <td><h3 >Продукты</h3></td>
          <td>
            <div class="input-field" >
              <select ref="selectcorner"  v-model="selectedCorner">
                <option :value="null" selected>Все</option>
                <option v-for="item of corners" :key="item.id" :value="item.name">{{
                    item.name
                  }}</option>
              </select>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div >
    </div>

    <ModalProduct
      v-if="items && groups && products && mods && isOpen"
      @close="refresh()"
      :items="items"
      :groups="groups"
      :product="product"
      :mods="mods"
    />

    <section v-if="products && groups">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Общий код</th>
            <th>Корнер</th>
            <th>Станция</th>
            <th>Группа</th>
            <th>Открыть</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of filtredProducts" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.corner }}</td>
            <td>
              <span class="white-text badge red">{{ item.station }}</span>
            </td>

            <td>{{ groupName(item.group_id) }}</td>
            <td>
              <button class="btn-small btn" @click="openModal(item)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>

            <td>
              <button class="btn-small btn" @click="del(item)">
                <i class="material-icons">delete</i>
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
import ModalProduct from "@/components/ModalProduct";
export default {
  name: "Products",
  components: {
    ModalProduct
  },
  data: () => ({
    corners: null,
    selectedCorner: null,
    products: null,
    modalProduct: null,
    isOpen: false,
    items: null,
    groups: null,
    mods: null,
    product: {
      id: null,
      name: null,
      items: [],
      station: 1,
      code: null,
      corner: "ALL",
      price: null,
      mods: []
    }
  }),
  computed: {
    filtredProducts(){
      if(!this.products) return null
      if(!this.selectedCorner) return this.products

      return this.products.filter(product => product.corner === this.selectedCorner)
    }
  },
  methods: {

    groupName(id){
      const gr = this.groups.find(it => it.id === id)
      if(!gr) return ""
      return gr.name
    },
    async del(item) {
      item.action = "DELETE"
      const ok = await this.$store.dispatch("saveProduct", item);
      if (ok) {
        this.products = await this.$store.dispatch("getAllProducts", {});
        return
      }
      return ok
    },
    async openModal(p) {

      if (!p) {
        this.product = {
          id: null,
          name: null,
          items: [],
          station: 1,
          code: null,
          corner: "ALL",
          price: null,
          mods: []
        };
      } else {
        this.product = JSON.parse(JSON.stringify(p));
      }
      this.isOpen = true;
      await this.$forceUpdate();
      this.modalProduct = window.M.Modal.init(
        document.querySelector(".modal-product"),
        {}
      );
      this.modalProduct.open();
      this.modalProduct.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalProduct.close();
      this.isOpen = false;
      this.products = await this.$store.dispatch("getAllProducts", {});
    }
  },
  async beforeMount() {
    this.items = await this.$store.dispatch("getAllItems", {});
  },
  async mounted() {
    this.products = await this.$store.dispatch("getAllProducts", {});
    this.corners = await this.$store.dispatch("getAllCorners", {});
    this.groups = await this.$store.dispatch("getAllGroups", {});
    this.mods = await this.$store.dispatch("getAllMods", {});
    this.select3 = window.M.FormSelect.init(this.$refs.selectcorner);
    window.M.updateTextFields();
  }
};
</script>

<style scoped></style>
