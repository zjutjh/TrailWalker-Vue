<template>
    <div v-if="group" class="mx-auto" style="max-width:30rem;">
        <h1>我的队伍</h1>
        <v-card class="radius-card text-center">
            <v-card-title>
                <div style="margin-left:auto;margin-right:auto;">
                    <v-avatar v-if="group" width="5rem" height="5rem">
                        <img :src="group.logo" alt=""/>
                    </v-avatar>
                </div>
            </v-card-title>
            <v-card-text>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>队伍名称</v-list-item-title>
                        <v-list-item-subtitle>{{group.name}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍口号</v-list-item-title>
                        <v-list-item-subtitle>{{group.description}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍路线</v-list-item-title>
                        <v-list-item-subtitle>{{group.route}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍人员</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-layout>
                    <v-flex>
                        <v-chip
                                link
                                :close="group.captain_id===$store.state.currentUser.id&&mate.id!==group.captain_id"
                                v-for="(mate, ix) in groupMates"
                                :key="ix"
                                @click="chipClick(mate)"
                                @close="alert(1)"
                        >
                            <v-avatar style="margin-left: -0.5rem">
                                <v-img :src="mate.logo"></v-img>
                            </v-avatar>
                            {{mate.name}}
                        </v-chip>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions style="display:block;">
                <div v-if="group.captain_id===$store.state.currentUser.id" style="margin:1rem;">
                    <v-btn color="error" v-if="group.is_submit" @click="unsubmit">取消报名</v-btn>
                    <v-btn color="error" v-else @click="submit">报名</v-btn>
                    <v-btn color="error" v-if="!group.is_submit" @click="breakGroup">解散</v-btn>
                    <v-btn color="error" @click="$router.push('/Group/Update')">修改</v-btn>
                </div>
                <div v-else>
                    <v-btn color="error" @click="leaveGroup">离开</v-btn>
                </div>
            </v-card-actions>
        </v-card>
        <div>
            <v-bottom-sheet v-model="MemberSheet">
                <v-sheet class="bottom-sheet" v-if="selectedMember != null">
                    <div class="text-center drop" style="padding:1rem;">
                        <v-avatar class="text-center">
                            <v-img :src="selectedMember.logo"></v-img>
                        </v-avatar>
                        <h1>姓名 {{selectedMember.name}}</h1>
                        <h2>手机 {{selectedMember.phone}}</h2>
                        <h2>邮箱 {{selectedMember.email}}</h2>
                        <h2>QQ {{selectedMember.qq}}</h2>
                        <h2>微信 {{selectedMember.wx_id}}</h2>
                        <div class="text-center" style="margin:1rem;" v-if="selectedMember.id!==group.captain_id">
                            <v-btn @click="knit">踢出</v-btn>
                        </div>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>

    </div>
</template>
<script lang="ts">
    import {Component, Vue, Inject} from "vue-property-decorator";
    import {API, apiMap} from "@/utils/api/api";

    import {postData} from "@/utils/fetch";
    import IGroup from "@/interface/IGroup";
    import IUser from "@/interface/IUser";

    @Component({components: {}})
    export default class MyGroup extends Vue {
        @Inject()
        private showErr!: any;
        private group: IGroup | null = null;
        private groupMates = {};

        private MemberSheet = false;
        private selectedMember?: IUser;

        private getMyGroup() {
            postData(API(apiMap.getMyGroupInfo))
                .then((res) => {
                    this.group = res.data as IGroup;
                    if (this.group) {
                        this.getMyMates();
                    }
                });
        }

        private getMyMates() {
            postData(API(apiMap.listGroupMembers))
                .then((res) => {
                    this.groupMates = res.data;
                });
        }

        private knit() {
            postData(API(apiMap.deleteGroupMember))
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.$router.push("/Group");
                });
        }

        private breakGroup() {
            postData(API(apiMap.breakGroup))
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.$router.push("/Group");
                });
        }

        private unsubmit() {
            postData(API(apiMap.unsubmitGroup))
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.$router.push("/Group");
                });
        }

        private submit() {
            postData(API(apiMap.submitGroup))
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.$router.push("/Group");
                });
        }

        private leaveGroup() {
            postData(API(apiMap.leaveGroup))
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.$router.push("/Group");
                });
        }

        private mounted() {
            this.getMyGroup();
        }

        private chipClick(mate: IUser) {
            this.selectedMember = mate;
            this.MemberSheet = true;
        }
    }
</script>
