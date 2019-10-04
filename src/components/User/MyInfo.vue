<template>
    <div v-if="user" class="flex-item mx-auto" style="max-width:30rem;">
        <h1>我</h1>
        <v-card class="radius-card text-center">
            <v-card-title>
                <div style="margin-left:auto;margin-right:auto;">
                    <v-avatar width="5rem" height="5rem">
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
                        <v-list-item-title>QQ</v-list-item-title>
                        <v-list-item-subtitle>{{user.qq}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>邮箱</v-list-item-title>
                        <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>微信</v-list-item-title>
                        <v-list-item-subtitle>{{user.wx_id}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card-text>
            <v-card-actions style="display:block;">
                <div style="margin:1rem;">
                    <v-btn color="error" @click="modify">修改</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Inject} from "vue-property-decorator";
    import {API, apiMap} from "@/utils/api/api";
    import {postData} from "@/utils/fetch";
    import IUser from "@/interface/IUser";

    @Component
    export default class MyInfo extends Vue {
        @Inject()
        private showErr!: any;
        private sheet: boolean = false;

        private user: IUser | null = null;

        private getMyInfoOnline() {
            postData(API(apiMap.getUserInfo))
                .then((res) => {
                    if (res.code === 1) {
                        this.user = res.data as IUser;
                        this.$store.state.currentUser =this.user;
                        this.$store.state.isLogin=true;
                    }
                    else{
                        this.$store.state.isLogin=false;
                    }

                });
        }

        private mounted() {
            this.getMyInfoOnline();
        }

        private modify() {

            this.$router.push("/Me/create");

        }
    }
</script>
