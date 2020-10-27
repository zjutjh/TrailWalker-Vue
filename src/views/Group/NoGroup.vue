<template>
  <div class="flex" style="flex-direction: column">
    <create-group class="flex-item"></create-group>
    <v-btn color="primary" style="margin-left: auto;margin-right: auto" @click="applyRandomTeam">随机匹配</v-btn>

    <group-list class="flex-item"></group-list>
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {postData} from "@/utils/fetch";
import {API, apiMap} from "@/utils/api/api";

@Component({
  components: {
    GroupList: () => import("@/components/Group/GroupList.vue"),
    CreateGroup: () => import("@/components/Group/CreateGroup.vue")
  }
})
export default class NoGroup extends Vue {

  private async applyRandomTeam() {
    this.$store.commit("setLoading", true);
    const res = await postData(API(apiMap.doMatchingApply));
    this.$store.commit("setLoading", false);

    if (res.code === 1) {
      this.$store.commit("showSuccessbar", "申请中");
      await this.$store.dispatch("getMyInfo");
      await this.$router.replace("/Group/Wait");
    } else {
      this.$store.commit("showErrorbar", res.data);
    }

  }
}
</script>
