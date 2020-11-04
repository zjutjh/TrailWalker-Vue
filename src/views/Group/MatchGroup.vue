<template>
  <div class="mx-auto" style="max-width:350px;">
    <v-card raised rounded="xl" style="margin-top: 1rem;padding: 1rem">
      <h1>匹配队伍</h1>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-select
              :items="$store.state.routes!==[]&&$store.state.routes!=={}?$store.state.routes:['屏峰小和山半程毅行', '屏峰小和山全程毅行', '朝晖京杭大运河毅行']"
              :rules="[v => !!v || '需要选择路线']"
              item-text="name"
              item-value="id"
              label="线路"
              prepend-icon="place"
              solo
              v-model="info.route_id"
          ></v-select>
        </v-form>
        <div class="text-center">
          <v-btn :disabled="!valid" @click="applyRandomTeam" color="primary">匹配
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </div>
      </v-card-text>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle color="red">更多个性化匹配欢迎大家的提出</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {postData} from "@/utils/fetch";
import {API, apiMap} from "@/utils/api/api";

@Component({})
export default class MatchGroup extends Vue {
  private info = {};
  private valid = true;

  private async applyRandomTeam() {
    this.$store.commit("setLoading", true);
    try {
      const res = await postData(API(apiMap.doMatchingApply), this.info);

      if (res.code === 1) {
        this.$store.commit("showSuccessbar", "申请中");
        await this.$store.dispatch("getMyInfo");
        await this.$router.replace("/Group/Wait");
      } else {
        this.$store.commit("showErrorbar", res.data);
      }

    } catch {
      this.$store.commit("showErrorbar", "网络错误");
    } finally {
      this.$store.commit("setLoading", false);

    }

  }
}
</script>
