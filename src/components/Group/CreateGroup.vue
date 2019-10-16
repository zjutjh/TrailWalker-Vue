import {apiMap} from "@/utils/api/api";
<template>
    <div class="mx-auto" style="max-width:30rem;">
        <h1 v-if="!isUpdate">创建队伍</h1>
        <h1 v-else>修改队伍</h1>
        <v-card>
            <v-card-title style="display:block;">
                <v-avatar width="5rem" height="5rem" style="margin-bottom:2rem" @click="AvataaarsSheet=true">

                    <v-img v-if="group.logo" :src="group.logo" alt="logo of a group"
                           :lazy-src="`https://picsum.photos/10/6?image=15`"
                           aspect-ratio="1"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                            >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-avatar>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field label="队伍名称" solo clearable v-model="group.name" :rules="nameRules" prepend-icon="mdi-account-group"
                    ></v-text-field>
                    <v-text-field label="队伍口号" solo clearable v-model="group.description"
                                  :rules="sloganRules" prepend-icon="mdi-bullhorn"></v-text-field>
                    <v-select
                            :items="$store.state.routes!==[]&&$store.state.routes!=={}?$store.state.routes:['屏峰小和山半程毅行', '屏峰小和山全程毅行', '朝晖京杭大运河毅行']"
                            item-text="name"
                            item-value="id"
                            label="线路"
                            solo
                            v-model="group.route_id"
                            :rules="[v => !!v || '需要选择路线']"
                            prepend-icon="place"
                    ></v-select>
                    <v-slider
                            label="人数"
                            :value="group.capacity"
                            thumb-label
                            min="4"
                            max="6"
                            ticks="always"
                            tick-size="4"
                    ></v-slider>
                </v-form>
                <div class="text-center">
                    <v-btn v-if="!isUpdate" :disabled="!valid" @click="createUpdateGroup" color="primary">创建队伍
                        <v-icon right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>
                    <v-btn v-else :disabled="!valid" @click="createUpdateGroup">修改队伍信息
                        <v-icon dark>mdi-wrench</v-icon>
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>

        <v-bottom-sheet v-model="AvataaarsSheet" scrollable>
            <v-sheet class="text-center bottom-sheet">
                <AvataaarsGenerator v-model="group.logo"></AvataaarsGenerator>
            </v-sheet>
        </v-bottom-sheet>
        <AvataaarsGenerator v-if="!group.logo" v-model="group.logo"></AvataaarsGenerator>
    </div>
</template>
<script lang="ts">
    import {nameRules, sloganRules} from "@/utils/rule/rules";
    import router from "@/router";
    import Disclaimer from "@/components/Disclaimer.vue";
    import {Component, Prop, Vue} from "vue-property-decorator";

    import {API, apiMap} from "@/utils/api/api";
    import {postData} from "@/utils/fetch";
    import AvataaarsGenerator from "@/components/AvataaarsGenerator.vue";
    import IGroup from "@/interface/IGroup";

    @Component({components: {Disclaimer, AvataaarsGenerator}})
    export default class CreateGroup extends Vue {

        private AvataaarsSheet: boolean = false;

        private nameRules = nameRules;
        private sloganRules = sloganRules;
        private group: IGroup = {
            name: "",
            logo: "",
            id: 0,
            description: "",
            route_id: 0,
            capacity: 4
        };

        private valid: boolean = false;

        @Prop({
            type: Boolean,
            default: false
        })
        private isUpdate?: boolean;

        private async createUpdateGroup() {
            const api = this.isUpdate ? apiMap.updateGroup : apiMap.createGroup;
            this.$store.commit("setLoading", true);
            const res = await postData(API(api), this.group);
            this.$store.commit("setLoading", false);

            if (res.code === 1) {
                await this.$store.dispatch("getMyInfo");
                await router.replace("/Group");
                if (this.isUpdate) {
                    this.$store.commit("showSuccessbar", "修改成功");
                } else {
                    this.$store.commit("showSuccessbar", "创建成功");
                }
            } else {
                this.$store.commit("showErrorbar", res.data);
            }

        }

        private async mounted() {
            await this.$store.dispatch("getRoutesInfo");
            if (this.isUpdate) {
                await this.$store.dispatch("getMyGroup");
                this.group = Object.assign({}, this.$store.state.currentGroup);
            }
        }
    }
</script>
