<template>
    <div class="mx-auto" style="max-width:30rem;">
        <h1>加入队伍</h1>
        <v-card class="radius-card">
            <v-list two-line>
                <template v-for="(item, i) in groups.data">
                    <v-divider v-if="i!==0" :key="i"></v-divider>
                    <v-list-item @click="groupClicked(i)" :key="groups.data.length+i">
                        <v-list-item-avatar>
                            <v-img :src="item.logo"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{item.name}}
                                <span class="v-list-item__subtitle">{{item.description}}</span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span class="v-list-item__subtitle">{{item.route}}</span>
                            </v-list-item-subtitle>
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
                    @input="getGroupList"
                    style="margin-left:0;margin-right:0;"
                    v-model="listRequest.page"
                    :length="groups.last_page"
                    :total-visible="5"
            ></v-pagination>
        </div>
        <div>
            <v-bottom-sheet v-model="applySheet">
                <v-sheet class="bottom-sheet" v-if="selectedGroup != null">
                    <div class="text-center drop" style="padding:1rem;">
                        <v-avatar class="text-center">
                            <v-img :src="selectedGroup.logo"></v-img>
                        </v-avatar>
                        <h1>{{selectedGroup.name}}</h1>
                        <p>{{selectedGroup.description}}</p>
                        <span class="v-list-item__subtitle">{{selectedGroup.route}}</span>
                        <div class="text-center" style="margin:1rem;">
                            <v-btn @click="applyTeam">加入</v-btn>
                        </div>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>
<script lang="ts">

    import Disclaimer from "@/components/Disclimer.vue";
    import {Component, Vue, Inject} from "vue-property-decorator";
    import {postData} from "@/utils/fetch";
    import {API, apiMap} from "@/utils/api/api";

    import IGroup from "@/interface/IGroup";
    import IListRequest from "@/interface/IListRequest";

    @Component({components: {Disclaimer}})
    export default class GroupList extends Vue {
        @Inject()
        private showErr!: any;
        private listRequest: IListRequest = {page: 1, page_size: 0};
        private selectedGroup: IGroup | null = null;

        private applySheet = false;

        private groups = {
            data: []
        };

        private groupClicked(groupIndex: number) {
            this.selectedGroup = this.groups.data[groupIndex];
            this.applySheet = true;
        }


        private getGroupList() {
            postData(API(apiMap.listGroup), this.listRequest)
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.groups = res.data;
                });
        }

        private applyTeam() {
            postData(API(apiMap.doApply), {group_id: (this.selectedGroup as IGroup).id})
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }

                    this.applySheet = false;
                });

        }

        private mounted() {
            this.getGroupList();
        }
    }
</script>
