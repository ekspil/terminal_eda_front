<template>
  <div>
    <div class="page-title">
      <h3>Модификаторы сэтов</h3>
    </div>

    <ModalMod
      v-if="products && mods && isOpen"
      @close="refresh()"
      :products="products"
      :mod="mod"
    />

    <section v-if="products && mods">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
<!--            <th>Цена</th>-->
            <th>Открыть</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of mods" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
<!--            <td>{{ item.price }}</td>-->
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
import ModalMod from "@/components/ModalMod";
export default {
  name: "Mods",
  components: {
    ModalMod
  },
  data: () => ({
    mods: null,
    modalMod: null,
    isOpen: false,
    products: null,
    mod: {
      id: null,
      name: null,
      items: [],
      price: null
    }
  }),

  methods: {

    async del(item) {
      item.action = "DELETE"
      const ok = await this.$store.dispatch("saveMod", item);
      if (ok) {
        this.mods = await this.$store.dispatch("getAllMods", {});
        return
      }
      return ok
    },
    async openModal(p) {

      if (!p) {
        this.mod = {
          id: null,
          name: null,
          items: [],
          price: null
        };
      } else {
        this.mod = JSON.parse(JSON.stringify(p));
      }
      this.isOpen = true;
      await this.$forceUpdate();
      this.modalMod = window.M.Modal.init(
        document.querySelector(".modal-mod"),
        {}
      );
      this.modalMod.open();
      this.modalMod.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalMod.close();
      this.isOpen = false;
      this.mods = await this.$store.dispatch("getAllMods", {});
    }
  },
  async beforeMount() {
    this.products = await this.$store.dispatch("getAllProducts", {});
  },
  async mounted() {
    this.mods = await this.$store.dispatch("getAllMods", {});
  }
};
</script>

<style scoped></style>
