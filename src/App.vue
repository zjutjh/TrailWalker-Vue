<template>
  <v-app>
    <header-bar></header-bar>
    <v-content class="content">
      <v-snackbar v-model="errBar" color="error" top>
        {{ errText }}
        <v-btn text @click="errBar = false">Close</v-btn>
      </v-snackbar>
      <transition name="slide-x-transition">
        <router-view />
      </transition>
    </v-content>
    <bottom-bar></bottom-bar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BottomBar from "./components/Bar/BottomBar.vue";
import HeaderBar from "./components/Bar/HeaderBar.vue";
import { postData } from "./utils/fetch";
import API from "./utils/api/api";
import apiMap from "./utils/api/map";
import IUser from "./interface/IUser";
export default Vue.extend({
  name: "App",
  components: { BottomBar, HeaderBar },
  data: () => ({
    errBar: false,
    errText: ""
  }),
  provide() {
    const that = this;
    return {
      showErr(text: string) {
        that.errText = text;
        that.errBar = true;
      }
    };
  },
  created() {
    const session = localStorage.getItem("userSession");
    if (session) {
      this.$store.state.session = session;
      this.getMyInfo();
    }
  },
  methods: {
    getMyInfo() {
      postData(API(apiMap.getMy), {
        userId: this.$store.state.currentUser.id
      })
        .then((res: any) => {
          if (res.code === 200) {
            this.$store.state.currentUser = res.data as IUser;
          } else {
            this.showErr("网络错误");
          }
        })
        .catch(() => {
          this.showErr("网络错误");
        });
    },
    showErr(text: string) {
      this.errText = text;
      this.errBar = true;
    }
  }

});
</script>
<style>
h1 {
  margin: 1.5rem;
}
.radius-card {
  border-radius: 1rem !important;
}
.content {
  padding-top: 4rem !important;
  padding-bottom: 2rem !important;
}
.drop {
  background-color: rgba(255, 255, 255, 1);
}
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .drop {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.65) !important;
  }
  .trans-drop {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0) !important;
  }
}

body {
  background-color: #efefef;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.flex-item {
  margin: 1rem;
  width: 90%;
}
.v-chip {
  margin: 0.2rem;
}
.v-bottom-sheet {
  border-radius: 30px 30px 0 0 !important;
  height:80%!important;
}
.bottom-sheet {
  border-radius: 30px 30px 0 0 !important;
  background-color: transparent !important;
  width: 100%
}
.scroll{
  overflow: auto;
  height: auto;
}
</style>
