<template>
  <v-bottom-navigation class="drop"  v-model="bottomNav" shift>
    <v-btn
        class="bottom-btn"
        rounded
        v-for="(item,index) in barContentList"
        :key="index"
        :value="item.name"
        @click="tagClicked(item.name)"
        v-if="!($store.state.currentUser===null&&item.name==='Group')">
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script lang="ts">
import router from "@/router";
import {Component, Vue, Watch} from "vue-property-decorator";
import INavContent from "@/interface/INavContent";

@Component
export default class BottomBar extends Vue {
  private bottomNav: string = "Home";
  private barContentList: INavContent[] = [
    {name: "Home", icon: "home"},
    {name: "Group", icon: "group"},
    {name: "Me", icon: "person"}
  ];

  private tagClicked(e: string) {
    if (e !== this.$route.name as string) {
      router.push("/" + e);
    }
  }

  @Watch("$route")
  private getPush() {
    this.bottomNav = this.$route.name as string;
  }
}
</script>
<style scoped>
.drop {
  position: sticky;
  z-index: 5;
}
.bottom-btn{
  height: 100%!important;
}
</style>
