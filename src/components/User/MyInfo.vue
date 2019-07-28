<template>
  <div v-if="user != null" class="mx-auto" style="max-width:30rem;">
    <h1>我</h1>
    <v-card class="radius-card text-center">
      <v-card-title>
        <div style="margin-left:auto;margin-right:auto;">
          <v-avatar>
            <v-img :src="user.logo"></v-img>
          </v-avatar>
        </div>
      </v-card-title>
      <v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>姓名</v-list-item-title>
            <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>手机号</v-list-item-title>
            <v-list-item-subtitle>{{user.phone}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>身份证号</v-list-item-title>
            <v-list-item-subtitle>{{user.idCard}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions style="display:block;">
        <div style="margin:1rem;">
          <v-btn color="error" @click="logout">登出</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { Component, Provide, Vue, Watch, Inject } from "vue-property-decorator";
import API from "@/utils/api/api";
import apiMap from "@/utils/api/map";
import { getData, postData } from "@/utils/fetch";
import IUser from "@/interface/IUser";
import IWalkRoute from "@/interface/IWalkRoute";
@Component
export default class MyInfo extends Vue {
  @Inject()
  private showErr!: any;
  private sheet: boolean = false;
  private routes: IWalkRoute[] = [];
  private user: IUser | null = null;
  private valid: boolean = false;
  private getMyInfoOnline() {
    postData(API(apiMap.getMy), {
      userId: this.$store.state.currentUser.id
    })
      .then((res: any) => {
        if (res.code === 200) {
          this.user = res.data as IUser;
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
    this.getMyInfoOnline();
  }
  private logout() {
    postData(API(apiMap.logout), {
      userId: this.$store.state.currentUser.id
    })
      .then((res: any) => {
        if (res.code === 200) {
          this.showErr("成功");
          router.replace("../../Me");
        } else {
          this.showErr("服务器错误");
        }
      })
      .catch(() => {
        this.showErr("网络错误");
      });
  }
}
</script>