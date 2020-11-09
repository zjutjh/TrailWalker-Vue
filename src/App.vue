<template>
  <v-app>

    <header-bar></header-bar>
    <v-snackbar v-model="$store.state.snackbar.isShow" style="text-align: center;padding: 0.5rem" bottom
                :color="$store.state.snackbar.color">
      {{ $store.state.snackbar.text }}
    </v-snackbar>
    <v-main class="content">

      <v-expand-transition>
        <router-view/>
      </v-expand-transition>

    </v-main>

    <bottom-bar v-if="$store.state.systemInfo.state === 1" v-show="!isRefuse"></bottom-bar>

    <v-overlay v-show="$store.state.isLoading" :value="$store.state.isLoading"
               style="z-index: 99999;backdrop-filter: blur(10px)">
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
      ></v-progress-circular>
      <h1>加载中</h1>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BottomBar from "./components/Bar/BottomBar.vue";
import HeaderBar from "./components/Bar/HeaderBar.vue";
import {postData} from "./utils/fetch";
import {API, apiMap} from "@/utils/api/api";

@Component({components: {BottomBar, HeaderBar}})
export default class App extends Vue {
  private isRefuse = false;

  private async mounted() {

    await this.$store.dispatch("getSystemInfo");

    if (this.$store.state.systemInfo.state === -1) {
      await this.$router.replace("/NotStart");
      return;
    }

    const search = window.location.search;
    try {
      const codex = search.split("?")[1].split("&")[0].split("=")[1];
      if (codex === "") {
        window.location.replace(API(apiMap.wxLogin));
        return;
      }

      await this.$store.dispatch("showLoading");
      const res = await postData(API(apiMap.login), {code: codex});
      switch (res.code) {
        case 1: {
          await this.$store.dispatch("getMyInfo");
          if (this.$store.state.systemInfo.state === 0) {
            await this.$store.dispatch("getMyGroup");
            await this.$store.dispatch("getMyGroupMember");
            await this.$router.replace("/End");
          }
          await this.$store.dispatch("closeLoading");
          this.$store.commit("showSuccessbar", "微信登录成功");
          break;
        }
        case -1: {
          window.location.replace(API(apiMap.wxLogin));
          break;
        }
        case -2: {
          window.location.replace(API(apiMap.wxLogin));
          break;
        }
        case -3: {
          this.isRefuse = true;
          this.$store.commit("showErrorbar", res.data);
          await this.$store.dispatch("closeLoading");
          await this.$router.replace("/Refuse");
          break;
        }
      }

    } catch {
      window.location.replace(API(apiMap.wxLogin));
    } finally {
      this.$store.commit("setLoading", false);
    }
  }
}
</script>
<style>


h1 {
  margin: 1.5rem;
  color: white;
}

.v-btn {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
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

#app {
  background-image: linear-gradient(120deg, #5694dc 0%, #c2e9fb 90%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: "webfont" !important;
  -webkit-font-smoothing: antialiased;
}

body {
  text-align: center;
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
  border-radius: 24px 24px 0 0 !important;
}

.bottom-sheet {
  border-radius: 24px 24px 0 0 !important;
  background-color: transparent !important;
  width: 100%;
}

.scroll {
  overflow: auto;
  height: auto;
}
</style>
<style lang="scss">
.dis-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  overflow: auto;
  height: 100%;

  header {
    .head-bk {
      height: 2.3rem;
      line-height: 3rem;
      text-align: center;
      background-size: cover;
      margin: 0 auto;
      font-weight: bold;
      font-size: 2rem;
      color: #877878;
    }
  }

  .d-content {
    border-radius: 0.4rem;
    padding: 0.5rem;

    h1 {
      text-align: center;
      font-weight: bold;
      font-size: 1.5rem;
      color: #bd7a6e;
      margin-bottom: 2rem;
    }

    h2 {
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
      color: #bd7a6e;
    }

    p {
      font-size: 1rem;
      color: #5a5875;
      margin-top: 0.2rem;
    }
  }

  .dis-btn {
    height: 4.6rem;
    line-height: 4.6rem;
    color: #ffffff;
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>

