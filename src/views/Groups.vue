<template>
  <div>
    <div class="page-title">
      <h3>Группы товаров</h3>
    </div>

    <ModalGroups @close="refresh()" :group="group" v-if="isOpen"/>

    <section v-if="items">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Редактировать</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
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
import ModalGroups from "@/components/ModalGroups";
export default {
  name: "Groups",
  components: {
    ModalGroups
  },
  data: () => ({
    isOpen: false,
    items: null,
    modalItem: null,
    group: {
      id: null,
      name: null,
    }
  }),
  methods: {

    async del(group) {
      group.action = "DELETE"
      const ok = await this.$store.dispatch("saveGroup", group);
      if (ok) {
        this.items = await this.$store.dispatch("getAllGroups", {});
        return
      }
      return ok
    },
    async openModal(i) {
      if (!i) {
        this.group = {
          id: null,
          name: null,
        };
      } else {
        this.group = i;
      }
      this.isOpen = true;
      await this.$forceUpdate();
      this.modalItem = window.M.Modal.init(
        document.querySelector(".modal-groups"),
        {}
      );
      this.modalItem.open();
      this.modalItem.options.onCloseEnd = () => {
        this.isOpen = false;
      };
    },
    async refresh() {
      this.modalItem.close();
      this.items = await this.$store.dispatch("getAllGroups", {});
    }
  },
  async mounted() {
    this.items = await this.$store.dispatch("getAllGroups", {});
  }
};
</script>

<style scoped></style>