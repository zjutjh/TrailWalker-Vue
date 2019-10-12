<template>
    <div v-if="$store.state.currentUser" class="flex-item mx-auto" style="max-width:30rem;">
        <h1>我</h1>
        <v-card class="text-center">
            <v-card-title>
                <div style="margin-left:auto;margin-right:auto;">
                    <v-avatar width="5rem" height="5rem">
                        <v-img
                                :src="$store.state.currentUser.logo"
                                :lazy-src="`https://picsum.photos/10/6?image=15`"
                                aspect-ratio="1"
                        >
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </v-avatar>
                </div>
            </v-card-title>
            <v-card-text>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>姓名</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentUser.name}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>手机号</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentUser.phone}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>QQ</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentUser.qq}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>邮箱</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentUser.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>微信</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentUser.wx_id}}</v-list-item-subtitle>
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
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class MyInfo extends Vue {
        private modify() {
            this.$router.push("/Me/create");
        }
    }
</script>
