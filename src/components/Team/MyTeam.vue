<template>
  <div v-if="team != null" class="mx-auto" style="max-width:30rem;">
    <h1>我的队伍</h1>
    <v-card class="radius-card text-center">
      <v-card-title>
        <div style="margin-left:auto;margin-right:auto;">
          <v-avatar>
            <v-img :src="team.logo"></v-img>
          </v-avatar>
        </div>
      </v-card-title>
      <v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>队伍名称</v-list-item-title>
            <v-list-item-subtitle>{{team.name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>队伍口号</v-list-item-title>
            <v-list-item-subtitle>{{team.slogan}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>队伍人员</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-layout>
          <v-flex>
            <v-chip
              link
              :close="team.leader==$store.state.currentUser.id"
              v-for="(mate, ix) in team.teamMates"
              :key="ix"
            >
              <v-icon left color="red">mdi-account</v-icon>
              {{mate.name}}
            </v-chip>
          </v-flex>
        </v-layout>
        <!-- <h2>{{team.route.name}}</h2> -->
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { Component, Provide, Vue, Watch, Inject } from "vue-property-decorator";
import API from "@/utils/api/api";
import apiMap from "@/utils/api/map";
import { getData, postData } from "@/utils/fetch";
import ITeam from "@/interface/ITeam";
import IWalkRoute from "@/interface/IWalkRoute";
@Component
export default class MyTeam extends Vue {
  @Inject()
  private showErr!: any;
  private sheet: boolean = false;
  private routes: IWalkRoute[] = [];
  private team: ITeam | null = null;
  private valid: boolean = false;
  private getMyTeam() {
    postData(API(apiMap.getMyTeam), {
      userId: this.$store.state.currentUser.id
    })
      .then((res: any) => {
        if (res.code === 200) {
          this.team = res.data as ITeam;
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
  private mounted() {
    this.getMyTeam();
  }
}
</script>