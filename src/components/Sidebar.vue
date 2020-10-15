<template>
  <ul class="sidenav app-sidenav" :class="{ open: navOpen }">
    <router-link
      v-for="link in links"
      tag="li"
      :key="link.url"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="/" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["navOpen"],
  data: () => ({
    links: [
      { title: "Смена", url: "/", exact: true },
      { title: "Товары", url: "/Products" },
      { title: "Заготовки", url: "/Items" },
      { title: "Пользователи", url: "/Users" },
      { title: "Рабочий стол", url: "/tabAdm" },
    ]
  })
};
</script>

<style scoped></style>
