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
          <v-text-field :rules="nameRules" clearable label="队伍名称" prepend-icon="mdi-account-group"
                        v-model="group.name"
          ></v-text-field>
          <v-text-field :rules="sloganRules" clearable label="队伍口号" prepend-icon="mdi-bullhorn"
                        v-model="group.description"></v-text-field>
          <v-select
              :items="$store.state.routes!==[]&&$store.state.routes!=={}?$store.state.routes:['屏峰小和山半程毅行', '屏峰小和山全程毅行', '朝晖京杭大运河毅行']"
              :rules="[v => !!v || '需要选择路线']"
              item-text="name"
              item-value="id"
              label="线路"
              prepend-icon="place"

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
          <div style="display: flex">
            <v-switch
                v-model="group.allow_matching"
                label="允许随机加入"
                class="align-content-center"
                color="blue"
                style="width: 9rem;"
            ></v-switch>
            <v-icon @click="dialog=!dialog">mdi-help-circle</v-icon>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
            >
              <v-card>
                <v-card-title class="headline">
                  关于随机匹配
                </v-card-title>
                <v-card-text>什么是随机匹配：随机匹配是精弘开发团队为了解决队伍人数而开发的新功能~（开发加鸡腿），选择接受随机匹配可能会使你的队伍获得更多小哥哥小姐姐的加入申请！除了帮忙凑齐报名限制人数之外，也是希望大家可以借这个机会多认识认识新朋友哦~
                  当然，如果不希望有陌生的人打扰自己的安宁，请不要勾选这个选项哦~
                  精弘，希望继续伴您五彩生活。
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
  private dialog = false;
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
