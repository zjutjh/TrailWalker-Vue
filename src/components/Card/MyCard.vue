<template>
    <div class="flex-item mx-auto" style="max-width:25rem;">
        <h1>信息</h1>
        <v-card class="radius-card" v-if="!$store.state.isLogin">
            <v-card-title>你还没有报名</v-card-title>
            <v-card-text>快去报名吧</v-card-text>
            <v-card-actions>
                <v-btn text @click="gotoLogin">报名</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="radius-card" v-else>
            <v-card-title>欢迎</v-card-title>
            <v-avatar width="5rem" height="5rem">
                <v-img v-if="$store.state.currentUser.logo" :src="$store.state.currentUser.logo"></v-img>
            </v-avatar>
            <v-card-text>{{$store.state.currentUser.name}}</v-card-text>
            <v-card-actions>
                <v-btn text v-if="!$store.state.isLogin" @click="gotoLogin">报名</v-btn>
                <v-btn text v-else @click="gotoLogin">More</v-btn>
                <v-btn text v-if="$store.state.isLogin" @click="gotoGroup">Group</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import router from "@/router";

    @Component
    export default class MyCard extends Vue {
        private gotoLogin() {
            router.replace("/Me");
        }

        private gotoGroup() {
            router.replace("/Group");
        }
    }
</script>
