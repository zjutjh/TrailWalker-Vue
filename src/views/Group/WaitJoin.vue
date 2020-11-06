<template>
  <div class="mx-auto flex-item" style="max-width:30rem;">
    <h1>我的队伍</h1>
    <v-card class="radius-card text-center" raised rounded="xl">
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
    this.$store.commit("setLoading", true);
    try {
    const res = await postData(API(apiMap.deleteApply));

    if (res.code !== 1) {
      this.$store.commit("showErrorbar", res.data);
    } else {
      this.$store.commit("showSuccessbar", "撤回成功");
    }
    } catch {
      this.$store.commit("showErrorbar", "网络错误");
    } finally {
      this.$store.commit("setLoading", false);
    }

    await this.$store.dispatch("getMyInfo");
    if (this.$store.state.currentUser.state <= 1) {
      await this.$router.push("/Group/No");
    } else if (this.$store.state.currentUser.state === 2) {
      await this.$router.push("/Group/Wait");
    } else {
      await this.$router.push("/Group");
    }

  }

}
</script>
