<template>
  <div class="mx-auto flex-item" style="max-width:30rem;">
    <h1>我的队伍</h1>
    <v-card class="radius-card text-center">
      <v-card-title class="text-center"> 等待加入</v-card-title>
      <v-card-text> 请耐心等待队长回应</v-card-text>
      <v-card-actions style="display:block;">
        <v-btn color="error" @click="cancel">撤回</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {API, apiMap} from "@/utils/api/api";
import {postData} from "@/utils/fetch";

@Component
export default class WaitJoin extends Vue {

  private async cancel() {
    const res = await postData(API(apiMap.deleteApply));

    if (res.code !== 1) {
      this.$store.commit("showErrorbar", res.data);
    } else {
      this.$store.commit("showSuccessbar", "撤回成功");
    }

    await this.$store.dispatch("getMyInfo");
    await this.$router.replace("/Group/No");

  }

}
</script>
