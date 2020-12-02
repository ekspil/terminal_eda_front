<template>
  <div>
    <div class="page-title">
      <h3>Заготовки</h3>
    </div>

    <ModalItems @close="refresh()" :item="item" v-if="isOpen"/>

    <section v-if="items">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Категория</th>
            <th>Время жизни</th>
            <th>Минимальная партия</th>
            <th>Редактировать</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.liveTime }}</td>
            <td>{{ item.minCount }}</td>
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
import ModalItems from "@/components/ModalItem";
export default {
  name: "Items",
  components: {
    ModalItems
  },
  data: () => ({
    isOpen: false,
    items: null,
    modalItem: null,
    item: {
      id: null,
      name: null,
      station: 1,
      liveTime: null,
      minCount: null
    }
  }),
  methods: {

    async del(item) {
      item.action = "DELETE"
      const ok = await this.$store.dispatch("saveItem", item);
      if (ok) {
        this.items = await this.$store.dispatch("getAllItems", {});
        return
      }
      return ok
    },
    async openModal(i) {
      if (!i) {
        this.item = {
          id: null,
          name: null,
          station: 1,
          liveTime: null,
          minCount: null
        };
      } else {
        this.item = i;
      }
      this.isOpen = true;
      await this.$forceUpdate();
      this.modalItem = window.M.Modal.init(
        document.querySelector(".modal-item"),
        {}
      );
      this.modalItem.open();
      this.modalItem.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalItem.close();
      this.items = await this.$store.dispatch("getAllItems", {});
    }
  },
  async mounted() {
    this.items = await this.$store.dispatch("getAllItems", {});
  }
};
</script>

<style scoped></style>