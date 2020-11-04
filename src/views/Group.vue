<template>
  <div class="flex">
    <v-expand-transition>
      <router-view/>
    </v-expand-transition>
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component
export default class Group extends Vue {
  private async mounted() {
    await this.$store.dispatch("getMyInfo");
    const sleepFun = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    sleepFun(200).then(async () => {
      if (this.$store.state.currentUser.state <= 1) {
        await this.$router.push("/Group/No");
      }

      if (this.$store.state.currentUser.state === 2) {
        await this.$router.push("/Group/Wait");
      }
    });


  }
}
</script>
