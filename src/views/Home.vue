<template>
  <div class="flex">
    <my-card class="flex-item mx-auto"></my-card>
<!--    <current-group-count-card class="flex-item mx-auto"-->
<!--                              label="报名人数"-->
<!--                              :value="$store.state.systemInfo.apply_count"></current-group-count-card>-->
    <tip-card class="flex-item mx-auto">欢迎报名精弘毅行</tip-card>


    <hello-card class="flex-item mx-auto"></hello-card>
    <v-card class="flex-item mx-auto" elevation="10" max-width="25rem" rounded="xl">
      <v-card-title>特别提醒</v-card-title>
      <v-card-text>请关注浙江工业大学精弘网络微信公众号,队伍编号信息后续发放。请务必关注浙江工业大学精弘网络及时查收出发时间和其它重要通知。</v-card-text>
    </v-card>


  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
    MyCard: () => import("@/components/Card/MyCard.vue"),
    HelloCard: () => import("@/components/Card/HelloCard.vue"),
    TipCard: () => import("@/components/Card/TipCard.vue"),
    CurrentGroupCountCard: () => import("@/components/Card/NumQuickCard.vue"),
  }
})
export default class Home extends Vue {
  private async mounted() {
    await this.$store.dispatch("getMyInfo");
  }
}
</script>
