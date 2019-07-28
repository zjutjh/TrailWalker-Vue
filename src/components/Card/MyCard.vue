<template>
  <div class="flex-item mx-auto" style="max-width:25rem;">
    <h1>信息</h1>
    <v-card class="radius-card">
      <v-card-title>你还没有登录</v-card-title>
      <v-card-text>快去登录吧</v-card-text>
      <v-card-actions>
        <v-btn text @click="gotoLogin">登录</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch, Emit } from "vue-property-decorator";
import router from "@/router";
@Component
export default class MyCard extends Vue {
  private gotoLogin() {
    router.replace("../../Me");
  }
}
</script>
