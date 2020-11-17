<template>
  <div class="app-main-layout">
    <Navbar @closeNav="navOpen = !navOpen" />
    <Sidebar :navOpen="navOpen" />


    <main class="app-content" :class="{ full: !navOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div v-if="false" class="fixed-action-btn">
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
export default {
  name: "MainLayout",
  data: () => ({
    navOpen: true,
    modalSmena: null,
    items: null,
  }),
  components: {
    Sidebar,
    Navbar
  },
  async mounted() {

  },
  methods: {
    async openModal(){
      if(this.$route.path.includes("Products")){
        this.modalProduct.open()
      }
      if(this.$route.path.includes("Users")){
        this.modalUser.open()
      }
    }
  },
};
</script>

<style scoped></style>
