<template>
    <v-app>
        <header-bar></header-bar>
        <v-content class="content">
            <notifications group="foo" position="top center"/>
            <transition name="slide-x-transition">
                <router-view/>
            </transition>
        </v-content>
        <bottom-bar v-if="$store.state.systemInfo.state === 1"></bottom-bar>
    </v-app>
</template>

<script lang="ts">
    import Vue from "vue";
    import BottomBar from "./components/Bar/BottomBar.vue";
    import HeaderBar from "./components/Bar/HeaderBar.vue";
    import {postData} from "./utils/fetch";
    import {API, apiMap} from "@/utils/api/api";
    import IUser from "./interface/IUser";

    export default Vue.extend({
        name: "App",
        components: {BottomBar, HeaderBar},
        async created() {
            await this.$store.dispatch("getSystemInfo");
            await this.$store.dispatch("getMyInfo");

            if (this.$store.state.systemInfo.state < 1) {
                await this.$router.push("/End");
            }

            const search = window.location.search;
            try {
                const codex = search.split("?")[1].split("&")[0].split("=")[1];
                postData(API(apiMap.login), {code: codex}).then((res) => {
                    if (res.code === 1) {
                        this.$store.dispatch("getMyInfo");
                        this.$notify({
                            group: "foo",
                            title: "Success",
                            text: "微信登录成功"
                        });
                    } else {
                        //window.location.replace(API(apiMap.wxLogin));
                    }
                });
            } catch (e) {
                //window.location.replace(API(apiMap.wxLogin));
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
