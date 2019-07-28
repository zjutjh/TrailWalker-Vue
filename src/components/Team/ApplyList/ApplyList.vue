<template>
  <div class="mx-auto" style="max-width:30rem;" v-if="usersInfo.totalPage != 0">
    <h1>申请列表</h1>
    <v-card class="radius-card">
      <v-list two-line>
        <template v-for="(item, i) in usersInfo.users">
          <v-divider v-if="i!=0" :key="i"></v-divider>
          <v-list-item @click="userClicked(i)" :key="usersInfo.users.length+i">
            <v-list-item-avatar>
              <v-img :src="item.logo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
              <v-list-item-subtitle>{{item.idCard}}</v-list-item-subtitle>
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
        @input="getApplyUserList"
        style="margin-left:0;margin-right:0;"
        v-model="listRequest.page"
        :length="usersInfo.totalPage"
        :total-visible="5"
      ></v-pagination>
    </div>
    <div>
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="bottom-sheet" v-if="selectedUser != null">
          <div class="text-center drop" style="padding:1rem;">
            <v-avatar class="text-center">
              <v-img :src="selectedUser.logo"></v-img>
            </v-avatar>
            <h1>{{selectedUser.name}}</h1>
            <p>{{selectedUser.idCard}}</p>

            <div class="text-center" style="margin:1rem;">
              <v-btn @click="approve">同意</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { Component, Vue, Inject } from "vue-property-decorator";
import { postData } from "@/utils/fetch";
import API from "@/utils/api/api";
import apiMap from "@/utils/api/map";
import IUser from "@/interface/IUser";
interface IUsersInfo {
  users: IUser[];
  pageSize: number;
  totalPage: number;
  page: number;
}
interface ListUserRequest {
  page: number;
  pageSize: number;
}
@Component
export default class ApplyList extends Vue {
  @Inject()
  private showErr!: any;
  private listRequest: ListUserRequest = { page: 1, pageSize: 0 };
  private selectedUser: IUser | null = null;
  private sheet = false;
  private usersInfo: IUsersInfo = {
    users: [],
    pageSize: 0,
    totalPage: 0,
    page: 1
  };
  private userClicked(userIndex: number) {
    this.selectedUser = this.usersInfo.users[userIndex];
    this.sheet = true;
  }
  private getApplyUserList() {
    postData(API(apiMap.applyLists), this.listRequest)
      .then((res: { data: IUsersInfo; code: number }) => {
        if (res.code === 200) {
          this.usersInfo = res.data;
        }
      })
      .catch(() => {
        this.sheet = false;
        this.showErr("网络错误");
      });
  }
  private approve() {
    postData(API(apiMap.approveApply), {
      leaderId: this.$store.state.currentUser.id,
      userId: (this.selectedUser as IUser).id
    })
      .then((res: { data: any; code: number }) => {
        if (res.code === 200) {
          this.sheet = false;
        }
      })
      .catch(() => {
        this.sheet = false;
        this.showErr("网络错误");
      });
    this.getApplyUserList();
  }
  private mounted() {
    this.getApplyUserList();
  }
}
</script>
