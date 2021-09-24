<template>
  <div>
    <div class="page-title">
      <h3>Корнеры</h3>
    </div>


    <modalCorners @close="refresh()" :corner="corner" v-if="isOpen"/>

    <section v-if="corners">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Редактировать</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="us of corners" :key="us.id">
            <td>{{ us.id }}</td>
            <td>{{ us.name }}</td>
            <td>
              <button class="btn-small btn" @click="openModal(us)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>

            <td>
              <button class="btn-small btn" @click="del(us)">
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
import modalCorners from "@/components/ModalCorner";
export default {
  name: "Corners",
  components: {
    modalCorners
  },
  data: () => ({
    isOpen: false,
    modalCorner: null,
    corners: null,
    corner: {
      id: null,
      name: null,
    }
  }),
  methods: {
    async del(item) {
      item.action = "DELETE"
      const ok = await this.$store.dispatch("saveCorner", item);
      if (ok) {
        this.corners = await this.$store.dispatch("getAllCorners", {});
        return;
      }
      return ok;
    },
    async openModal(i) {
      if (!i) {
        this.corner = {
          id: null,
          name: null
        };
      } else {
        this.corner = i;
      }
      this.isOpen = true;

      await this.$forceUpdate();
      this.modalCorner = window.M.Modal.init(
        document.querySelector(".modal-corner"),
        {}
      );

      this.modalCorner.open();
      this.modalCorner.options.onCloseEnd = () => {
        this.isOpen = false;
      };

    },
    async refresh() {
      this.modalCorner.close();
      this.corners = await this.$store.dispatch("getAllCorners", {});
    }
  },
  async mounted() {
    this.corners = await this.$store.dispatch("getAllCorners", {});
    window.M.updateTextFields();
  }
};
</script>

<style scoped></style>
