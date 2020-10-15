<template>
  <div class="app-main-layout">
    <Navbar @closeNav="navOpen = !navOpen" />
    <Sidebar :navOpen="navOpen" />

    <ModalProducts @close="modalProduct.close()"/>
    <ModalItems @close="modalItem.close()"/>
    <ModalUsers @close="modalUser.close()"/>
    <ModalSmena @close="modalSmena.close()"/>

    <main class="app-content" :class="{ full: !navOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div v-if="$route.path != '/'" class="fixed-action-btn">
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
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModalProducts from "@/components/ModalProduct"
import ModalItems from "@/components/ModalItem"
import ModalUsers from "@/components/ModalUser"
import ModalSmena from "@/components/ModalSmena"
export default {
  name: "MainLayout",
  data: () => ({
    navOpen: true,
    modalProduct: null,
    modalItem: null,
    modalUser: null,
    modalSmena: null,
  }),
  components: {
    Sidebar,
    Navbar,
    ModalProducts,
    ModalItems,
    ModalUsers,
    ModalSmena
  },
  mounted() {
    this.modalProduct = window.M.Modal.init(document.querySelector('.modal-product'), {});
    this.modalItem = window.M.Modal.init(document.querySelector('.modal-item'), {});
    this.modalSmena = window.M.Modal.init(document.querySelector('.modal-smena'), {});
    this.modalUser = window.M.Modal.init(document.querySelector('.modal-user'), {});
  },
  methods: {
    openModal(){
      if(this.$route.path.includes("Products")){
        this.modalProduct.open()
      }
      if(this.$route.path.includes("Items")){
        this.modalItem.open()
      }
      if(this.$route.path.includes("Users")){
        this.modalUser.open()
      }
    }
  },
};
</script>

<style scoped></style>
