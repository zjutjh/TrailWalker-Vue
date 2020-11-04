<template>
  <div class="flex" style="flex-direction: column">
    <create-group class="flex-item"></create-group>
    <group-list class="flex-item"></group-list>
    <v-btn color="primary" style="margin:1rem;margin-left: auto;margin-right: auto" @click="applyRandomGruop()">没有找到心怡的队伍？
    </v-btn>

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

  private async applyRandomGruop() {

    await this.$router.push("/Group/Match");
  }
}
</script>
