<template>
  <div class="mx-auto" style="max-width:35rem;">
    <h1>毅行账号</h1>
    <v-card class="radius-card text-center">
      <v-card-title style="display:block;margin:1rem;">欢迎加入精弘毅行</v-card-title>
      <v-card-text style="padding-bottom: 0;">
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="手机号"
            :disabled="show"
            solo
            clearable
            v-model="user.phone"
            :rules="phoneRules"
          ></v-text-field>
          <div style="display:flex">
            <v-text-field
              :disabled="show"
              style="display:inline"
              label="手机验证码"
              solo
              clearable
              v-model="code"
              :rules="codeRules"
            ></v-text-field>
            <v-btn
              style="display:inline;height:48px;"
              :disabled="show||codeWaitTime>0"
              @click="sentCode"
            >
              <div v-if="codeWaitTime<=0">发送</div>
              <div v-else>{{codeWaitTime}}</div>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-expand-transition>
        <div v-show="show">
          <create-user></create-user>
        </div>
      </v-expand-transition>
      <v-card-actions style="display:block;" v-if="!show">
        <div style="margin:1rem;">
          <v-btn :disabled="!valid" @click="this.sheet = true">注册/登录</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch, Inject } from "vue-property-decorator";
import CreateUser from "@/components/User/CreateUser.vue";
import router from "@/router";
import API from "@/utils/api/api";
import apiMap from "@/utils/api/map";
import { getData, postData } from "@/utils/fetch";
import IUser from "@/interface/IUser";
@Component({ components: { CreateUser } })
export default class Login extends Vue {
  @Inject()
  private showErr!: any;
  @Provide()
  private user: IUser = {
    name: "",
    idCard: "",
    teamStatus: "no",
    phone: "",
  };
  private show: boolean = true;
  private valid: boolean = false;
  private codeWaitTime: number = 0;
  private code: string = "";
  private phoneRules = [
    (v: string) => !!v || "需要手机号",
    (v: string) => (v && v.length === 11) || "手机号必须为11位",
    // (v: string) => (v && (typeof v === "number" && !isNaN(v))) || "手机号必须为数字"
  ];
  private codeRules = [
    (v: string) => !!v || "需要验证码",
    (v: string) => (v && v.length >= 4 && v.length <= 6) || "验证码必须为4~6位",
    (v: string) => (v && (typeof v === "number" && !isNaN(v))) || "验证码必须为数字"
  ];
  private sentCode() {
    if (this.codeWaitTime <= 0) {
      this.codeWaitTime = 90;
      postData(API(apiMap.sentCode), { phone: this.user.phone })
        .then((res: { code: number, data: "unreg" | "reged" | "unknow" }) => {
          if (res.code === 200) {
            this.showErr("发送成功");
          } else {
            this.showErr("服务器错误");
          }
        })
        .catch(() => {
          this.showErr("网络错误");
        });
      const timer = setInterval(() => {
        this.codeWaitTime--;
        if (this.codeWaitTime <= 0) {
          window.clearInterval(timer);
        }
      }, 1000);
    }

  }
  private submitLogin() {
    postData(API(apiMap.createTeam), { user: this.user, code: this.code })
      .then((res: { code: number, data: { state: "unreg" | "reged" | "unknow", session: string, user: IUser } }) => {
        if (res.code === 200) {
          if (res.data.state === "unreg") {
            this.show = true;
          } else {
            this.$store.state.currentUser = res.data.user;
            localStorage.setItem("userSession", res.data.session.toString());
            this.$store.state.session = res.data.session.toString();
            router.replace("../../Me");
          }
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