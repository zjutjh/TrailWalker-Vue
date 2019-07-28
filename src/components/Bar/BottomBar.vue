<template>
  <v-bottom-navigation class="drop TopRadius" v-model="bottomNav" style="position: sticky;">
    <v-btn
      v-for="(item,index) in barContentList"
      :key="index"
      :value="item.name"
      @click="tagClicked(item.name)"
      :disabled="item.name=='Team'&&$store.state.session==''"
    >
      <span>{{item.name}}</span>
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script lang="ts">
import router from "@/router";
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
interface INavContent {
  name: string;
  icon: string;
}
@Component
export default class BottomBar extends Vue {
  private bottomNav: string = "Home";
  private barContentList: INavContent[] = [
    { name: "Home", icon: "home" },
    { name: "Team", icon: "group" },
    { name: "Me", icon: "person" }
  ];
  private tagClicked(e: string) {
    router.replace("/" + e);
  }
  @Watch("$route")
  private getPsth() {
    this.bottomNav = this.$route.name as string;
  }
}
</script>
<style>
.TopRadius{
  border-radius: 15px;
  bottom: 10px !important;
  width: inherit !important;
  margin-left: 10px;
  margin-right: 10px;
}
.circle{
  border-radius: 999em!important;
}
</style>
