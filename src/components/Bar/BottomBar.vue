<template>
  <v-bottom-navigation class="drop" v-model="bottomNav">
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

  private async tagClicked(e: string) {
    if (this.$route.path.substr(1) === e) {
      return;
    }
    switch (e) {
      case "Home": {
        await router.replace("/Home");
        break;
      }
      case "Group": {
        await this.$store.dispatch("getMyInfo");
        if (this.$store.state.currentUser.state <= 1) {
          await this.$router.push("/Group/No");
        } else if (this.$store.state.currentUser.state === 2) {
          await this.$router.push("/Group/Wait");
        } else {
          await this.$router.push("/Group");
        }
        break;
      }
      case "Me": {
        await router.replace("/Me");
        break;
      }
    }
  }

  @Watch("$route")
  private getPush() {
    this.bottomNav = this.$route.path.split("/")[1];
  }
}
</script>
<style scoped>
.drop {
  position: sticky;
  z-index: 5;
}

.bottom-btn {
  height: 100% !important;
}
</style>
