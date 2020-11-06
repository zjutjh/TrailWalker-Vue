<template>
  <div class="flex-item mx-auto" style="max-width:30rem;">
    <div v-if="$store.state.currentUser">
      <h1>个人信息</h1>
      <v-card class="text-center" raised rounded="xl">
        <v-card-title>
          <div style="margin-left:auto;margin-right:auto;">
            <Avataaars :src="$store.state.currentUser.logo"/>
          </div>
        </v-card-title>
        <v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                姓名
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-account</v-icon>
                {{ $store.state.currentUser.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                手机号
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-phone</v-icon>
                {{ $store.state.currentUser.phone }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                QQ
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-qqchat</v-icon>
                {{ $store.state.currentUser.qq }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                邮箱
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-email</v-icon>
                {{ $store.state.currentUser.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="$store.state.currentUser.wx_id">
            <v-list-item-content>
              <v-list-item-title>
                微信
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-wechat</v-icon>
                {{ $store.state.currentUser.wx_id }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions style="display:block;">
          <div style="margin:0.5rem;">
            <v-btn color="error" @click="modify">修改
              <v-icon dark>mdi-wrench</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </div>
    <v-card v-else raised rounded="xl" max-width="25rem">
      <Avataaars style="margin: 1rem"/>
      <v-card-title style="padding-top: 0;padding-bottom: 0">你还没有报名</v-card-title>
      <v-card-actions>
        <v-card-text>
          <v-btn @click="gotoLogin">点我报名</v-btn>
        </v-card-text>
      </v-card-actions>
    </v-card>
  </div>

</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import router from "@/router";

@Component({
  components: {
    Avataaars: () => import("@/components/Avataaars.vue")
  }
})
export default class MyInfo extends Vue {
  private modify() {
    this.$router.push("/Me/create");
  }

  private gotoLogin() {
    router.replace("/Me/Create");
  }

}
</script>
