<template>
  <div>
    <v-card-title style="display:block;">
      请注册
      <v-avatar width="5rem" height="5rem" style="margin-bottom:2rem" @click="showAVE">
        <v-img v-if="logo" :src="logo"></v-img>
      </v-avatar>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field label="姓名" solo clearable v-model="user.name" :rules="nameRules"></v-text-field>
        <v-text-field label="身份证" solo clearable v-model="user.idCard" :rules="idCardRules"></v-text-field>
      </v-form>
      <div class="text-center">
        <v-btn :disabled="!valid" @click="this.sheet = true">注册</v-btn>
      </div>
    </v-card-text>
    <v-bottom-sheet v-model="sheet" scrollable>
      <v-sheet class="text-center bottom-sheet scroll">
        <disclaimer class="text-center" @agree="submitUser"></disclaimer>
      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="sheet2" scrollable>
      <v-sheet class="text-center bottom-sheet" >
        <avx v-model="logo"></avx>
      </v-sheet>
    </v-bottom-sheet>
    <avx v-if="!logo" v-model="logo"></avx>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch, Inject, Prop } from "vue-property-decorator";
import router from "@/router";
import Disclaimer from "@/components/Disclimer.vue";
import API from "@/utils/api/api";
import apiMap from "@/utils/api/map";
import { getData, postData } from "@/utils/fetch";
import IUser from "@/interface/IUser";
import Avx from "@/components/AvataaarsGenerator.vue";
@Component({ components: { Disclaimer, Avx } })
export default class CreateUser extends Vue {

  @Inject()
  private showErr!: any;
  private sheet: boolean = false;
  private sheet2: boolean = false;
  @Inject()
  private user!: IUser;

  private logo!: string;
  private valid: boolean = false;
  private nameRules = [
    (v: string) => !!v || "需要名称",
    (v: string) => (v && v.length <= 10) || "名称必须小于10个字符",
    (v: string) => (v && this.checkName(v)) || "名称已经被注册"
  ];
  private idCardRules = [
    (v: string) => !!v || "需要身份证号",
    (v: string) => (v && v.length === 18) || "身份证号必须为18位"
  ];
  private phoneRules = [
    (v: string) => !!v || "需要手机号",
    (v: string) => (v && v.length === 11) || "手机号必须为11位"
  ];
  private submitUser() {
    postData(API(apiMap.createTeam), this.user)
      .then((res: any) => {
        if (res.code === 200) {
          this.$store.state.currentUser = res.data.user;
          localStorage.setItem("userSession", res.data.session);
          this.$store.state.session = res.data.session.toString();
          router.replace("../../Me");
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
  private showAVE() {
    this.sheet2 = true;
  }
  private checkName(name: string): boolean {
    postData(API(apiMap.checkUserName), { UserName: name })
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
}
</script>