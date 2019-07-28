<template>
  <div class="mx-auto" style="max-width:30rem;">
    <h1>加入队伍</h1>
    <v-card class="radius-card">
      <v-list two-line>
        <template v-for="(item, i) in teamsInfo.teams">
          <v-divider v-if="i!=0" :key="i"></v-divider>
          <v-list-item @click="teamClicked(i)" :key="teamsInfo.teams.length+i">
            <v-list-item-avatar>
              <v-img :src="item.logo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
                <span class="v-list-item__subtitle">{{item.slogan}}</span>
              </v-list-item-title>

              <v-list-item-subtitle>
                <v-chip
                  link
                  v-for="(mate, ix) in item.teamMates.slice(0, 2)"
                  :key="ix"
                >{{mate.name}}</v-chip>
                <v-chip link v-if="item.teamMates.length>3">...</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
            <div>
              <v-divider class="mx-4"></v-divider>
            </div>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <div class="text-center">
      <v-pagination
        @input="getTeamList"
        style="margin-left:0;margin-right:0;"
        v-model="listRequest.page"
        :length="teamsInfo.totalPage"
        :total-visible="5"
      ></v-pagination>
    </div>
    <div>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="bottom-sheet" v-if="selectedTeam != null">
          <div class="text-center drop" style="padding:1rem;">
            <v-avatar class="text-center">
              <v-img :src="selectedTeam.logo"></v-img>
            </v-avatar>
            <h1>{{selectedTeam.name}}</h1>
            <p>{{selectedTeam.slogan}}</p>
            <v-list-item-subtitle>
              <v-chip link v-for="(mate, ix) in selectedTeam.teamMates" :key="ix">{{mate.name}}</v-chip>
            </v-list-item-subtitle>
            <div class="text-center" style="margin:1rem;">
              <v-btn @click="openDisclaimer">加入</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-bottom-sheet>
      <v-bottom-sheet v-model="sheet2" scrollable>
        <v-sheet class="text-center bottom-sheet scroll">
          <disclaimer class="text-center" @agree="applyTeam"></disclaimer>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import Disclaimer from "@/components/Disclimer.vue";
import {
  Component,
  Provide,
  Vue,
  Watch,
  ProvideReactive,
  Inject
} from "vue-property-decorator";
import { postData } from "../../utils/fetch";
import API from "../../utils/api/api";
import apiMap from "../../utils/api/map";
import ITeam from "@/interface/ITeam";
interface ITeamsInfo {
  teams: ITeam[];
  pageSize: number;
  totalPage: number;
  page: number;
}
interface ListTeamRequest {
  page: number;
  pageSize: number;
}
@Component({ components: { Disclaimer } })
export default class TeamList extends Vue {
  @Inject()
  private showErr!: any;
  private listRequest: ListTeamRequest = { page: 1, pageSize: 0 };
  private selectedTeam: ITeam | null = null;
  private sheet = false;
  private sheet2 = false;
  private teamsInfo: ITeamsInfo = {
    teams: [],
    pageSize: 0,
    totalPage: 0,
    page: 1
  };
  private teamClicked(team: any) {
    this.selectedTeam = this.teamsInfo.teams[team];
    this.sheet = true;
  }
  private openDisclaimer() {
    this.sheet = false;
    this.sheet2 = true;
  }
  private agree() {
    this.applyTeam();
  }
  private getTeamList() {
    postData(API(apiMap.teamLists), this.listRequest)
      .then((res: { data: ITeamsInfo; code: number }) => {
        if (res.code === 200) {
          this.teamsInfo = res.data;
        }
      })
      .catch(() => {
        this.sheet = false;
        this.showErr("网络错误");
      });
  }
  private applyTeam() {
    postData(API(apiMap.applyTeam), {
      userId: this.$store.state.currentUser.id,
      teamId: (this.selectedTeam as ITeam).id
    })
      .then((res: { data: any; code: number }) => {
        if (res.code === 200) {
          this.sheet = false;
          this.sheet2 = false;
        }
      })
      .catch(() => {
        this.sheet = false;
        this.showErr("网络错误");
      });
  }
  private mounted() {
    this.getTeamList();
  }
}
</script>
