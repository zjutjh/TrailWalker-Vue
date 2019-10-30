<template>
    <div v-if="$store.state.currentGroup" class="mx-auto" style="max-width:30rem;">
        <h1>我的队伍</h1>
        <v-card v-if="(!$store.state.currentGroup||$store.state.currentGroup.is_submit!==1)&&isEnd">
            <v-card-title>很遗憾你没有报名成功</v-card-title>
            <v-card-text>你的队伍没有成功提交</v-card-text>
        </v-card>
        <v-card v-else class="text-center">
            <v-card-title>
                <div style="margin-left:auto;margin-right:auto;">
                    <Avataaars v-if="$store.state.currentGroup" :src="$store.state.currentGroup.logo"/>
                </div>
            </v-card-title>
            <v-card-text>
                <v-list-item two-line v-if="$store.state.currentGroup.No">
                    <v-list-item-content>
                        <v-list-item-title>队伍编号</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.currentGroup.No}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line v-if="!$store.state.currentGroup.No&&$store.state.currentGroup.is_submit===1">
                    <v-list-item-content>
                        <v-list-item-title>队伍编号</v-list-item-title>
                        <v-list-item-subtitle>等待分配</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>队伍名称</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-icon>mdi-account-group</v-icon>
                            {{$store.state.currentGroup.name}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队长</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-icon>mdi-account-tie</v-icon>
                            {{$store.state.currentGroup.captain_name}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍口号</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-icon>mdi-bullhorn</v-icon>
                            {{$store.state.currentGroup.description}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍路线</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-icon>place</v-icon>
                            {{$store.state.currentGroup.route}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>队伍人员</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-layout>
                    <v-flex>
                        <v-chip :close="$store.state.currentGroup.captain_id===$store.state.currentUser.id&&mate.id!==$store.state.currentGroup.captain_id&&!isEnd"
                                :key="ix"
                                @click="chipClick(mate)"
                                @click:close="knitHandle(mate)"
                                link
                                v-for="(mate, ix) in $store.state.groupMates">
                            <Avataaars :src="mate.logo"/>
                            {{mate.name}}
                        </v-chip>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions v-if="!isEnd" style="display:block;">
                <div v-if="$store.state.currentGroup.captain_id===$store.state.currentUser.id" style="margin:0.5rem;">
                    <v-btn @click="unsubmit" color="error" v-if="$store.state.currentGroup.is_submit===1">取消提交
                        <v-icon right>mdi-cancel</v-icon>
                    </v-btn>
                    <v-btn @click="submit" color="primary" v-else>队伍提交
                        <v-icon right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>
                    <v-btn @click="breakConfirm=true" color="error" v-if="$store.state.currentGroup.is_submit!==1">解散
                        <v-icon right>mdi-bank-remove</v-icon>
                    </v-btn>
                    <v-btn @click="$router.push('/Group/Update')"
                           v-if="$store.state.currentGroup.is_submit!==1">修改
                        <v-icon right>mdi-wrench</v-icon>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn v-if="$store.state.currentGroup.is_submit!==1&&!isEnd" color="error" @click="leaveGroup">离开
                        <v-icon right>mdi-walk</v-icon>
                    </v-btn>
                </div>
            </v-card-actions>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle color="red">报名期间每天10点左右开始增加名额</v-list-item-subtitle>
                    <v-list-item-subtitle color="red">只有队伍提交成功才视为成功报名精弘毅行</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <div>
            <v-bottom-sheet v-model="MemberSheet">
                <v-sheet class="bottom-sheet" v-if="selectedMember">
                    <div class="text-center drop" style="padding:1rem;">

                        <Avataaars :src="selectedMember.logo"/>

                        <h1>姓名 {{selectedMember.name}}</h1>
                        <h2>手机 {{selectedMember.phone}}</h2>
                        <h2>邮箱 {{selectedMember.email}}</h2>
                        <h2 v-if="selectedMember.qq">QQ {{selectedMember.qq}}</h2>
                        <h2 v-if="selectedMember.wx_id">微信 {{selectedMember.wx_id}}</h2>
                        <v-btn @click="knitHandle(selectedMember)"
                               color="error" v-if="$store.state.currentGroup.is_submit!==1&&
                        $store.state.currentGroup.captain_id===$store.state.currentUser.id&&
                        selectedMember.id!==$store.state.currentGroup.captain_id&&!isEnd">踢出
                            <v-icon right>mdi-foot-print</v-icon>
                        </v-btn>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
        <v-dialog v-model="breakConfirm" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">确定要解散队伍吗？</v-card-title>
                <v-card-text>没有队伍，你将无法参加精弘毅行</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="breakConfirm=false">取消</v-btn>
                    <v-btn color="green darken-1" text @click="breakGroup">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="knitConfirm" persistent max-width="290">
            <v-card v-if="selectedMember">
                <v-card-title class="headline">确定要踢{{selectedMember.name}}吗？</v-card-title>
                <v-card-text>队伍人数不足可能无法参加本次活动</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="knitConfirm=false">取消</v-btn>
                    <v-btn color="green darken-1" text @click="knit">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import {API, apiMap} from "@/utils/api/api";
    import {postData} from "@/utils/fetch";
    import IUser from "@/interface/IUser";


    @Component({
        components: {Avataaars: () => import(/* webpackChunkName: "group" */"@/components/Avataaars.vue")}
    })
    export default class MyGroup extends Vue {

        private breakConfirm = false;
        private knitConfirm = false;

        @Prop({
            type: Boolean,
            default: false
        })
        private isEnd?: boolean;

        private MemberSheet = false;
        private selectedMember: IUser | null = null;

        private async getMyGroup() {
            await this.$store.dispatch("getMyGroup");
            await this.$store.dispatch("getMyGroupMember");
        }

        private async knitHandle(user: IUser) {
            this.selectedMember = user;
            this.knitConfirm = true;
        }

        private async knit() {
            this.knitConfirm = false;
            if (this.selectedMember === null) {
                return;
            }
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.deleteGroupMember), {user_id: this.selectedMember.id});
            this.$store.commit("setLoading", false);
            this.MemberSheet = false;
            if (res.code === 1) {
                this.getMyGroup();
                this.$store.commit("showSuccessbar", "踢人成功");
                this.selectedMember = null;
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
