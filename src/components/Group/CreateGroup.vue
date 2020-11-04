import {apiMap} from "@/utils/api/api";
<template>
  <div class="mx-auto" style="max-width:30rem;">
    <h1 v-if="!isUpdate">创建队伍</h1>
    <h1 v-else>修改队伍</h1>
    <v-card raised rounded="xl">
      <v-card-title style="display:block;" @click="AvataaarsSheet=true">
        <Avataaars v-if="group.logo" :src="group.logo"/>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field :rules="nameRules" clearable label="队伍名称" prepend-icon="mdi-account-group" solo
                        v-model="group.name"
          ></v-text-field>
          <v-text-field :rules="sloganRules" clearable label="队伍口号" prepend-icon="mdi-bullhorn"
                        solo v-model="group.description"></v-text-field>
          <v-select
              :items="$store.state.routes!==[]&&$store.state.routes!=={}?$store.state.routes:['屏峰小和山半程毅行', '屏峰小和山全程毅行', '朝晖京杭大运河毅行']"
              :rules="[v => !!v || '需要选择路线']"
              item-text="name"
              item-value="id"
              label="线路"
              prepend-icon="place"
              solo
              v-model="group.route_id"
          ></v-select>
          <v-slider
              v-model="group.capacity"
              label="人数"
              max="6"
              min="4"
              :rules="[v => !!v || '需要选择人数']"
              tick-size="4"
              thumb-label="always"
          ></v-slider>
          <v-switch
              v-model="group.allow_matching"
              label="允许随机加入"
              class="align-content-center"
              color="blue"
          ></v-switch>
        </v-form>
        <div class="text-center">
          <v-btn v-if="!isUpdate" :disabled="!valid" @click="createUpdateGroup" color="primary">创建队伍
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-btn v-else :disabled="!valid" @click="createUpdateGroup">修改队伍信息
            <v-icon dark>mdi-wrench</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <v-bottom-sheet v-model="AvataaarsSheet" scrollable>
      <v-sheet class="text-center bottom-sheet">
        <AvataaarsGenerator v-model="group.logo"></AvataaarsGenerator>
      </v-sheet>
    </v-bottom-sheet>
    <AvataaarsGenerator v-if="!group.logo" v-model="group.logo"></AvataaarsGenerator>
  </div>
</template>
<script lang="ts">
import {nameRules, sloganRules} from "@/utils/rule/rules";
import router from "@/router";
import {Component, Prop, Vue} from "vue-property-decorator";
import {API, apiMap} from "@/utils/api/api";
import {postData} from "@/utils/fetch";

@Component({
  components: {
    Disclaimer: () => import("@/components/Disclaimer.vue"),
    AvataaarsGenerator: () => import("@/components/AvataaarsGenerator.vue"),
    Avataaars: () => import("@/components/Avataaars.vue")
  }
})
export default class CreateGroup extends Vue {

  private AvataaarsSheet: boolean = false;

  private nameRules = nameRules;
  private sloganRules = sloganRules;
  private group = {
    name: "",
    logo: "",
    id: 0,
    description: "",
    route_id: 0,
    capacity: 4,
    allow_matching: false
  };

  private valid: boolean = false;

  @Prop({
    type: Boolean,
    default: false
  })
  private isUpdate?: boolean;

  private async createUpdateGroup() {
    const api = this.isUpdate ? apiMap.updateGroup : apiMap.createGroup;
    this.$store.commit("setLoading", true);
    try {
      const res = await postData(API(api), this.group);

      if (res.code === 1) {
        await this.$store.dispatch("getMyInfo");
        await router.replace("/Group");
        if (this.isUpdate) {
          this.$store.commit("showSuccessbar", "修改成功");
        } else {
          this.$store.commit("showSuccessbar", "创建成功");
        }
      } else {
        this.$store.commit("showErrorbar", res.data);
      }
    } catch {
      this.$store.commit("showErrorbar", "网络错误");
    } finally {

      this.$store.commit("setLoading", false);

    }


  }

  private async mounted() {
    await this.$store.dispatch("getRoutesInfo");
    if (this.isUpdate) {
      await this.$store.dispatch("getMyGroup");
      this.group = Object.assign({}, this.$store.state.currentGroup);
    }
  }
}
</script>
