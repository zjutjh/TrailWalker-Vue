<template>
    <div class="mx-auto" style="max-width:30rem;">
        <h1 v-if="!isUpdate">创建队伍</h1>
        <h1 v-else>修改队伍</h1>
        <v-card class="radius-card">
            <v-card-title style="display:block;">
                <v-avatar width="5rem" height="5rem" style="margin-bottom:2rem" @click="AvataaarsSheet=true">
                    <img v-if="group.logo" :src="group.logo" alt="logo of a group"/>
                </v-avatar>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field label="队伍名称" solo clearable v-model="group.name" :rules="nameRules"></v-text-field>
                    <v-text-field label="队伍口号" solo clearable v-model="group.description"
                                  :rules="nameRules"></v-text-field>
                    <v-select
                            :items="['屏峰小和山半程毅行', '屏峰小和山全程毅行', '朝晖京杭大运河毅行']"
                            item-text="name"
                            item-value="id"
                            label="线路"
                            solo
                            v-model="group.route"
                            :rules="[v => !!v || '需要选择路线']"
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
                    <v-btn v-if="!isUpdate" :disabled="!valid" @click="createGroup">创建并报名</v-btn>
                    <v-btn v-else :disabled="!valid" @click="updateGroup">修改</v-btn>
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
    import {nameRules, phoneRules, idCardRules} from "@/utils/rule/rules";
    import router from "@/router";
    import Disclaimer from "@/components/Disclimer.vue";
    import {Component, Vue, Inject, Prop} from "vue-property-decorator";

    import {API, apiMap} from "@/utils/api/api";
    import {postData} from "@/utils/fetch";
    import AvataaarsGenerator from "@/components/AvataaarsGenerator.vue";
    import IGroup from "@/interface/IGroup";

    @Component({components: {Disclaimer, AvataaarsGenerator}})
    export default class CreateGroup extends Vue {
        @Inject()
        private showErr!: any;

        private AvataaarsSheet: boolean = false;
        private idCardRules = idCardRules;
        private phoneRules = phoneRules;
        private nameRules = nameRules;
        private group: IGroup = {
            name: "",
            logo: "",
            id: 0,
            description: "",
            route: "朝晖京杭大运河毅行",
            capacity: 4
        };
        private valid: boolean = false;

        @Prop({
            type: Boolean,
            default: false
        })
        private isUpdate?: Boolean;

        private createGroup() {
            postData(API(apiMap.createGroup), this.group)
                .then((res: any) => {
                    router.replace("/Group");
                });

        }

        private updateGroup() {
            postData(API(apiMap.updateGroup), this.group)
                .then((res: any) => {
                    router.push("/Group");
                });

        }

        private getMyGroup() {
            postData(API(apiMap.getMyGroupInfo))
                .then((res) => {
                    this.group = res.data as IGroup;
                });
        }

        private mounted() {
            if (this.isUpdate) {
                this.getMyGroup();
            }
        }
    }
</script>
