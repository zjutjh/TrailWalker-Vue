<template>
  <div class="mx-auto">
    <h1>加入队伍</h1>
    <v-text-field max-width="25rem" label="搜索" solo clearable raised rounded v-model="listRequest.query_string"
                  @keydown="query"></v-text-field>
    <v-card min-height="2rem" rounded="xl" raised style="margin: 1rem;padding: 1rem;">
      <v-list two-line v-if="groups.data.length>0">
        <template v-for="(item, i) in groups.data">
          <v-divider v-if="i!==0" :key="i"></v-divider>
          <v-list-item @click="groupClicked(i)" :key="groups.data.length+i">
            <v-list-item-avatar>
              <Avataaars :src="item.logo"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}({{ item.captain_name }})
                <span class="v-list-item__subtitle">{{ item.description }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class="v-list-item__subtitle">{{ item.route }}</span>
                <span class="v-list-item__subtitle">{{ item.members }}/{{ item.capacity }}</span>
                <span class="v-list-item__subtitle" v-if="item.is_submit===1">✔</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <div>
              <v-divider class="mx-4"></v-divider>
            </div>
          </v-list-item>
        </template>
      </v-list>
      <span v-else class="v-list-item__subtitle" style="padding: 1rem">没有更多了</span>
    </v-card>
    <div class="text-center">
      <v-pagination
          :length="groups.last_page"
          :total-visible="5"
          @input="getGroupList"
          @next="getGroupList"
          @previous="getGroupList"
          style="margin-left:0;margin-right:0;"
          v-model="listRequest.page"
      ></v-pagination>
    </div>
    <div>
      <v-bottom-sheet v-model="applySheet">
        <v-sheet class="bottom-sheet" v-if="selectedGroup != null">
          <div class="text-center drop" style="padding:1rem;">
            <Avataaars :src="selectedGroup.logo"/>
            <h2>{{ selectedGroup.name }}</h2>
            <span class="v-list-item__subtitle">{{ selectedGroup.route }}</span>
            <p class="text--secondary">{{ selectedGroup.description }}</p>
            <v-layout>
              <v-flex>
                <v-chip style="color: white"
                    :key="ix"
                    link
                    :color="mate.sex==='男'?'light-blue lighten-1':'pink lighten-3'"
                    v-for="(mate, ix) in selectedGroup.member_list">
                  <Avataaars :src="mate.logo"/>
                {{ mate.name }}
                </v-chip>
              </v-flex>
            </v-layout>

            <div class="text-center" style="margin:1rem;" v-if="selectedGroup.is_submit===0">
              <v-btn @click="applyTeam">加入</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {postData} from "@/utils/fetch";
import {API, apiMap} from "@/utils/api/api";

import IGroup from "@/interface/IGroup";
import IListRequest from "@/interface/IListRequest";

@Component({
  components: {
    Disclaimer: () => import(/* webpackChunkName: "group" */"@/components/Disclaimer.vue"),
    Avataaars: () => import(/* webpackChunkName: "group" */"@/components/Avataaars.vue")
  }
})
export default class GroupList extends Vue {

  private listRequest: IListRequest = {page: 1, page_size: 0, query_string: ""};
  private selectedGroup: IGroup | null = null;

  private applySheet = false;

  private groups = {
    data: []
  };

  private query(key: KeyboardEvent) {
    if (key.key === "Enter") {
      this.getGroupList();
    }
  }

  private groupClicked(groupIndex: number) {
    this.selectedGroup = this.groups.data[groupIndex];
    this.applySheet = true;
  }


  private async getGroupList() {
    const res = await postData(API(apiMap.searchGroup), this.listRequest);
    if (res.code === 1) {
      this.groups = res.data;
    }
  }

  private async applyTeam() {
    this.$store.commit("setLoading", true);
    try {
      const res = await postData(API(apiMap.doApply), {group_id: (this.selectedGroup as IGroup).id});
      if (res.code === 1) {
        this.applySheet = false;
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

  private mounted() {
    this.getGroupList();
  }
}
</script>
