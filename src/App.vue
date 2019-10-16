<template>
    <v-app>

        <header-bar></header-bar>
        <v-content class="content">
            <v-snackbar v-model="$store.state.snackbar.isShow" top :color="$store.state.snackbar.color">
                {{ $store.state.snackbar.text }}
                <v-btn color="white" text @click="$store.state.snackbar.isShow = false"> Close</v-btn>
            </v-snackbar>
            <transition name="slide-x-transition">
                <router-view/>
            </transition>
        </v-content>
        <bottom-bar v-if="$store.state.systemInfo.state === 1&&isOriginHei"></bottom-bar>

        <v-overlay :value="$store.state.isLoading" style="z-index: 99999">
            <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
            <h1>等待中</h1>
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
        private async created() {

            alert("当前系统测试中，不是正式报名，报名无效。");

            await this.$store.dispatch("getSystemInfo");
            if (this.$store.state.systemInfo.state === -1) {
                await this.$router.replace("/Start");
                return;
            }

            const search = window.location.search;
            try {
                const codex = search.split("?")[1].split("&")[0].split("=")[1];
                if (codex === "") {
                    window.location.replace(API(apiMap.wxLogin));
                } else {
                    await this.$store.dispatch("showLoading");
                    const res = await postData(API(apiMap.login), {code: codex});
                    await this.$store.dispatch("closeLoading");
                    if (res.code === 1) {
                        await this.$store.dispatch("getMyInfo");
                        this.$store.commit("showSuccessbar", "微信登录成功");
                        if (this.$store.state.systemInfo.state === 0) {
                            await this.$store.dispatch("getMyGroup");
                            await this.$store.dispatch("getMyGroupMember");
                            await this.$router.replace("/End");
                        }

                    } else {
                        window.location.replace(API(apiMap.wxLogin));
                    }
                }
            } catch {
                window.location.replace(API(apiMap.wxLogin));
            }


        }

        private isOriginHei = true; //显示或者隐藏button
        private documentHeight = document.documentElement.clientHeight;  //默认屏幕高度
        private mounted() {
            window.onresize = () => {
                return (() => {
                    if (this.documentHeight > document.documentElement.clientHeight) {
                        this.isOriginHei = false;
                    } else {
                        this.isOriginHei = true;
                    }
                })();
            };
        }
    }
</script>
<style>
    h1 {
        margin: 1.5rem;
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
        text-align: center;
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
    }

    .bottom-sheet {
        border-radius: 30px 30px 0 0 !important;
        background-color: transparent !important;
        width: 100%;
    }

    .scroll {
        overflow: auto;
        height: auto;
    }
</style>
