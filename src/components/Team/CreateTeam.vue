<template>
  <div class="mx-auto" style="max-width:30rem;">
    <h1>创建队伍</h1>
    <v-card class="radius-card">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field label="队伍名称" solo clearable v-model="team.name" :rules="nameRules"></v-text-field>
          <v-text-field label="队伍口号" solo clearable v-model="team.slogan" :rules="sloganRules"></v-text-field>
          <v-select
            :items="routes"
            item-text="name"
            item-value="id"
            label="线路"
            solo
            v-model="team.routeId"
            :rules="[v => !!v || '需要选择路线']"
          ></v-select>
          <v-slider
            label="人数"
            :value="team.capacity"
            thumb-label
            min="4"
            max="6"
            ticks="always"
            tick-size="4"
          ></v-slider>
        </v-form>
        <div class="text-center">
          <v-btn :disabled="!valid" @click="this.sheet = true">创建并报名</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <v-bottom-sheet v-model="sheet" scrollable>
      <v-sheet class="text-center bottom-sheet scroll">
        <disclaimer class="text-center" @agree="submitTeam"></disclaimer>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import Disclaimer from "@/components/Disclimer.vue";
import { Component, Provide, Vue, Watch, Inject } from "vue-property-decorator";
import API from "@/utils/api/api";
import apiMap from "@/utils/api/map";
import { getData, postData } from "@/utils/fetch";
import ITeam from "@/interface/ITeam";
interface IWalkRoute {
  id: number;
  name: string;
  level: number;
  levelLabel: string;
  isFull: boolean;
}

@Component({ components: { Disclaimer } })
export default class CreateTeam extends Vue {
  @Inject()
  private showErr!: any;
  private sheet: boolean = false;
  private routes: IWalkRoute[] = [];
  private team: ITeam = {
    name: "",
    logo: "",
    id: 0,
    slogan: "",
    capacity: 4
  };
  private valid: boolean = false;
  private nameRules = [
    (v: string) => !!v || "需要名称",
    (v: string) => (v && v.length <= 10) || "名称必须小于10个字符",
    (v: string) => (v && this.checkName(v)) || "名称已经被注册"
  ];
  private sloganRules = [
    (v: string) => !!v || "需要口号",
    (v: string) => (v && v.length <= 50) || "口号必须小于50个字符"
  ];
  private submitTeam() {
    postData(API(apiMap.createTeam), this.team)
      .then((res: any) => {
        if (res.code === 200) {
          router.replace("../../Team");
        } else {
          this.sheet = false;
          this.showErr("服务器错误");
        }
      })
      .catch(() => {
        this.sheet = false;
        this.showErr("网络错误");
      });
  }
  private getWalkRoute() {
    getData(API(apiMap.getWalkRoute))
      .then((res) => {
        if (res.code === 200) {
          this.routes = res.data;
        }
      })
      .catch(() => {
        this.sheet = false;
        this.showErr("网络错误");
      });
  }
  private checkName(name: string): boolean {
    postData(API(apiMap.checkTeamName), { TeamName: name })
      .then((res: { data: { alivable: boolean }; code: number }) => {
        if (res.code === 200) {
          if (res.data.alivable) {
            return true;
          }
        } else {
          this.showErr("服务器错误");
        }
      })
      .catch(() => {
        this.showErr("网络错误");
      });
    return false;
  }
  private mounted() {
    this.getWalkRoute();
  }
}
</script>