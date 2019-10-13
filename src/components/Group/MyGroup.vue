<template>
    <div v-if="$store.state.currentGroup" class="mx-auto" style="max-width:30rem;">
        <h1>我的队伍</h1>
        <v-card class="text-center">
            <v-card-title>
                <div style="margin-left:auto;margin-right:auto;">
                    <v-avatar v-if="$store.state.currentGroup" width="5rem" height="5rem">
                        <v-img
                                :src="$store.state.currentGroup.logo" alt=""
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
                <v-list-item two-line v-if="$store.state.currentGroup.No">
                    <v-list-item-content>
                        <v-list-item-title>队伍编号</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentGroup.No}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>队伍名称</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentGroup.name}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍口号</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentGroup.description}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍路线</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentGroup.route}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍人员</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-layout>
                    <v-flex>
                        <v-chip link v-for="(mate, ix) in groupMates" :key="ix" @click="chipClick(mate)"
                                @click:close="knit(mate)"
                                :close="$store.state.currentGroup.captain_id===$store.state.currentUser.id&&mate.id!==$store.state.currentGroup.captain_id"
                        >
                            <v-avatar style="margin-left: -0.5rem">
                                <v-img :src="mate.logo"></v-img>
                            </v-avatar>
                            {{mate.name}}
                        </v-chip>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions v-if="!isEnd" style="display:block;">
                <div v-if="$store.state.currentGroup.captain_id===$store.state.currentUser.id" style="margin:1rem;">
                    <v-btn color="error" v-if="$store.state.currentGroup.is_submit===1" @click="unsubmit">取消报名</v-btn>
                    <v-btn color="error" v-else @click="submit">报名</v-btn>
                    <v-btn color="error" v-if="$store.state.currentGroup.is_submit!==1" @click="breakGroup">解散</v-btn>
                    <v-btn color="error" v-if="$store.state.currentGroup.is_submit!==1" @click="$router.push('/Group/Update')">修改</v-btn>
                </div>
                <div v-else>
                    <v-btn  v-if="$store.state.currentGroup.is_submit!==1" color="error" @click="leaveGroup">离开</v-btn>
                </div>
            </v-card-actions>
        </v-card>
        <div>
            <v-bottom-sheet v-model="MemberSheet">
                <v-sheet class="bottom-sheet" v-if="selectedMember">
                    <div class="text-center drop" style="padding:1rem;">
                        <v-avatar class="text-center">
                            <v-img :src="selectedMember.logo"></v-img>
                        </v-avatar>
                        <h1>姓名 {{selectedMember.name}}</h1>
                        <h2>手机 {{selectedMember.phone}}</h2>
                        <h2>邮箱 {{selectedMember.email}}</h2>
                        <h2>QQ {{selectedMember.qq}}</h2>
                        <h2>微信 {{selectedMember.wx_id}}</h2>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import {API, apiMap} from "@/utils/api/api";

    import {postData} from "@/utils/fetch";
    import IUser from "@/interface/IUser";

    @Component({components: {}})
    export default class MyGroup extends Vue {

        @Prop({
            type: Boolean,
            default: false
        })
        private isEnd?: boolean;

        private groupMates = {};
        private MemberSheet = false;
        private selectedMember: IUser | null = null;

        private async getMyGroup() {
            await this.$store.dispatch("getMyGroup");
            await this.getMyMates();
        }

        private async getMyMates() {
            const res = await postData(API(apiMap.listGroupMembers));
            this.groupMates = res.data;
        }

        private async knit(user: IUser) {
            this.$store.commit("setLoading", false);
            const res = await postData(API(apiMap.deleteGroupMember), {user_id: user.id});
            this.$store.commit("setLoading", false);

            if (res.code === 1) {
                this.getMyGroup();
                this.$store.commit("showSuccessbar", "踢人成功");
                await this.$router.push("/Group");
            } else {
                this.$store.commit("showErrorbar", res.data);
            }

        }

        private async breakGroup() {
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.breakGroup));
            this.$store.commit("setLoading", false);
            if (res.code !== 1) {
                this.$store.commit("showErrorbar", res.data);
            } else {
                this.$store.commit("showSuccessbar", "解散成功");
                await this.getMyGroup();
                await this.$router.push("/Group/No");
            }


        }

        private async unsubmit() {
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.unsubmitGroup));
            this.$store.commit("setLoading", false);
            if (res.code !== 1) {
                this.$store.commit("showErrorbar", res.data);
            } else {
                this.$store.commit("showSuccessbar", "取消队伍报名成功");
                this.getMyGroup();
                await this.$router.replace("/Group");
            }
        }

        private async submit() {
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.submitGroup));
            this.$store.commit("setLoading", false);

            if (res.code !== 1) {
                this.$store.commit("showErrorbar", res.data);
            } else {
                this.$store.commit("showSuccessbar", "提交成功,请保持关注浙江工业大学精弘网络微信公众号,后期消息将通过公众号推送");
                this.getMyGroup();
                await this.$router.replace("/Group");
            }
        }

        private async leaveGroup() {
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.leaveGroup));
            this.$store.commit("setLoading", false);

            if (res.code !== 1) {
                this.$store.commit("showErrorbar", res.data);
            } else {
                this.$store.commit("showSuccessbar", "操作成功");
            }

            await this.getMyGroup();
            await this.$router.replace("/Group/No");

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
