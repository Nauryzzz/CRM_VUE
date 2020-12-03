<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
    >
        <a class="waves-effect waves-orange pointer" to="/">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
  import localizeFilter from "@/filters/localize.filter";

  export default {
    name:"SideBar",
    props: ['value'],
    data() {
        return {
            links: [
                {title: localizeFilter("menu_bill"), url: "/", exact: true},
                {title: localizeFilter("menu_history"), url: "/history"},
                {title: localizeFilter("menu_planning"), url: "/planning"},
                {title: localizeFilter("menu_record"), url: "/record"},
                {title: localizeFilter("menu_category"), url: "/categories"}
            ]
        }
    }  
  };
</script>

<style>
</style>