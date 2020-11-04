<template>
  <v-card v-if="!$store.state.isLogin" raised rounded="xl" max-width="25rem">
    <Avataaars style="margin: 1rem"/>
    <v-card-title>你还没有报名</v-card-title>
    <v-card-actions>
      <v-card-text>
        <v-btn  @click="gotoLogin">点我报名</v-btn>
      </v-card-text>
    </v-card-actions>
  </v-card>
  <v-card v-else max-width="25rem" rounded="xl" raised >
    <v-card-title>欢迎</v-card-title>
    <Avataaars v-if="$store.state.currentUser.logo" :src="$store.state.currentUser.logo" style="margin: 1rem"/>
    <v-card-text>{{ $store.state.currentUser.name }}</v-card-text>
    <v-card-actions>
      <v-btn text v-if="!$store.state.isLogin" @click="gotoLogin">报名</v-btn>
      <v-btn text v-else @click="gotoLogin">More</v-btn>
      <v-btn text v-if="$store.state.isLogin" @click="gotoGroup">Group</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import router from "@/router";

@Component({
  components: {
    Avataaars: () => import("@/components/Avataaars.vue")
  }
})
export default class MyCard extends Vue {
  private gotoLogin() {
    router.replace("/Me");
  }

  private gotoGroup() {
    router.replace("/Group");
  }
}
</script>
