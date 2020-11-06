<template>
  <div class="mx-auto" style="max-width:350px;">
    <h1>匹配队伍</h1>
    <v-card raised rounded="xl" style="margin-top: 1rem;padding: 1rem">

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
          <v-list-item-subtitle style="color: #03a9f4" @click="dialog=!dialog">更多个性化匹配,敬请期待</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          关于随机匹配个性化
        </v-card-title>
        <v-card-text>
          因为工期很赶，所以随机匹配还是个很简陋的孩子。
          或许您已经找到了对的人，或许是我们目前的功能还无法满足您的需求。
          不过这都说明我们【精弘】提供的服务还不够完美，我们会继续优化算法和产品功能。希望明年能满足各位的个性化需求。
          最后，很感谢您看到这，也很感谢您能成为精弘毅行的一份子。
          希望精弘，仍能继续伴您五彩生活。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            好的
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {postData} from "@/utils/fetch";
import {API, apiMap} from "@/utils/api/api";

@Component({})
export default class MatchGroup extends Vue {
  private info = {};
  private valid = false;
  private dialog = false;

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
