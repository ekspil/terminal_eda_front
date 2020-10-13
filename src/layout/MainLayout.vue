<template>
  <div class="app-main-layout">
    <Navbar @closeNav="navOpen = !navOpen" />
    <Sidebar :navOpen="navOpen" />

    <main class="app-content" :class="{ full: !navOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div v-if="$route.path != '/'" class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        :to="'/add/' + $route.path"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default {
  name: "MainLayout",
  data: () => ({
    navOpen: true
  }),
  components: {
    Sidebar,
    Navbar
  }
};
</script>

<style scoped></style>
