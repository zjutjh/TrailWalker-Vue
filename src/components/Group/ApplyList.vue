<template>
    <div v-if="applyUsers.data.length>0" class="mx-auto" style="max-width:30rem;">
        <h1>申请列表</h1>
        <v-card >
            <v-list two-line>
                <template v-for="(item, i) in applyUsers.data">
                    <v-divider v-if="i!==0" :key="i"></v-divider>
                    <v-list-item @click="userClicked(i)" :key="applyUsers.data.length+i">
                        <v-list-item-avatar>
                            <v-img :src="item.logo"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{item.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.id_card}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <div>
                            <v-divider class="mx-4"></v-divider>
                        </div>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
        <div class="text-center">
            <v-pagination
                    @input="getApplyUserList"
                    style="margin-left:0;margin-right:0;"
                    v-model="listRequest.page"
                    :length="applyUsers.last_page"
                    :total-visible="5"
                    @next="getApplyUserList"
                    @previous="getApplyUserList"
            ></v-pagination>
        </div>
        <div>
            <v-bottom-sheet v-model="confirmSheet">
                <v-sheet class="bottom-sheet" v-if="selectedUser != null">
                    <div class="text-center drop" style="padding:1rem;">
                        <v-avatar class="text-center">
                            <v-img :src="selectedUser.logo"></v-img>
                        </v-avatar>
                        <h1>{{selectedUser.name}}</h1>
                        <p>{{selectedUser.id_card}}</p>
                        <div class="text-center" style="margin:1rem;">
                            <v-btn @click="approve" style="margin-right:1rem;">同意<v-icon right>mdi-checkbox-marked-circle</v-icon></v-btn>
                            <v-btn @click="refuse" style="margin-left:1rem;" color="error">拒绝<v-icon right>mdi-cancel</v-icon></v-btn>
                        </div>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {postData} from "@/utils/fetch";
    import {API, apiMap} from "@/utils/api/api";

    import IUser from "@/interface/IUser";
    import IListRequest from "@/interface/IListRequest";

    @Component
    export default class ApplyList extends Vue {


        private listRequest: IListRequest = {page: 1, page_size: 0};
        private applyUsers: any = {
            data: []
        };
        private selectedUser: IUser | null = null;

        private confirmSheet = false;

        private userClicked(userIndex: number) {
            this.selectedUser = this.applyUsers.data[userIndex];
            this.confirmSheet = true;
        }

        /**
         * 获得队伍申请列表
         */
        private async getApplyUserList() {
            const res = await postData(API(apiMap.listApply), this.listRequest);
            if (res.code === 1) {
                this.confirmSheet = false;
                this.applyUsers = res.data;
            }
        }

        /**
         * 同意入队
         */
        private async approve() {
            this.confirmSheet = false;
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.agreeApply), {apply_id: (this.selectedUser as IUser).id});
            this.$store.commit("setLoading", false);

            if (res.code === 1) {
                await this.$store.dispatch("getMyGroup");
                await this.$store.dispatch("getMyGroupMember");
                this.confirmSheet = false;
                this.$store.commit("showSuccessbar", "操作成功");
            } else {
                this.$store.commit("showErrorbar", res.data);
            }

            await this.getApplyUserList();
        }

        /**
         * 拒绝入队
         */
        private async refuse() {
            this.confirmSheet = false;
            this.$store.commit("setLoading", true);
            const res = await postData(API(apiMap.refuseApply), {apply_id: (this.selectedUser as IUser).id});
            this.$store.commit("setLoading", false);

            if (res.code === 1) {
                this.$store.commit("showSuccessbar", "操作成功");
            } else {
                this.$store.commit("showErrorbar", res.data);
            }

            await this.getApplyUserList();
        }

        private mounted() {
            this.getApplyUserList();
        }
    }
</script>
