<template>
    <v-card class="mx-auto" color="#26c6da" dark max-width="400" max-height="25rem" style="margin-top:1rem;">
        <v-card-title>
            <v-avatar>
                <v-img src="jhlogo.png"></v-img>
            </v-avatar>
            <span class="title font-weight-light">精弘网络</span>
        </v-card-title>

        <v-card-text
                class="headline font-weight-bold"
        >天气渐凉，又到了每年精弘毅行的季节了，
            叶子一片片飞舞而下，
            某一处山脉又将迎来熙熙攘攘的毅行人潮。
            这是一场盛大的相遇，
            也是精弘毅行与人一年一度不约而至的相遇，
            是不可辜负的好时光。
        </v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img
                            class="elevation-6"
                            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>精弘网络</v-list-item-title>
                </v-list-item-content>

                <v-layout align-center justify-end>
                    <v-icon class="mr-1">person</v-icon>
                    <span class="subheading mr-2">{{people}}</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">group</v-icon>
                    <span class="subheading">{{groups}}</span>
                </v-layout>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {postData} from "@/utils/fetch";
    import {API, apiMap} from "@/utils/api/api";


    @Component
    export default class HelloCard extends Vue {
        private groups = 0;
        private people = 0;

        /**
         *
         * 同意入队
         */
        private getInfo() {
            postData(API(apiMap.systemInfo))
                .then((res) => {
                    this.groups = res.data.group_count;
                    this.people = res.data.apply_count;
                });
        }

        private mounted() {
            this.getInfo();
        }
    }
</script>

