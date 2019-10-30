<template>
    <v-card color="#26c6da" max-width="25rem" dark style="margin-top:1rem;" elevation="4">
        <v-card-title>
            <v-avatar>
                <v-img src="jhlogo.png"></v-img>
            </v-avatar>
            <span class="title font-weight-light" style="padding-left: 1rem">精弘网络</span>
        </v-card-title>
        <v-card-text class="font-weight-bold">
            天气渐凉，又到了每年精弘毅行的季节了，<br/>
            叶子一片片飞舞而下，<br/>
            某一处山脉又将迎来熙熙攘攘的毅行人潮。<br/>
            这是一场盛大的相遇，<br/>
            也是精弘毅行与人一年一度不约而至的相遇，<br/>
            是不可辜负的好时光。<br/>
        </v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <Avataaars :size="32"/>
                <v-list-item-content>
                    <v-list-item-title>精弘网络</v-list-item-title>
                </v-list-item-content>
                <v-layout align-center justify-end>
                    <v-icon class="mr-1">person</v-icon>
                    <span class="subheading mr-2">{{$store.state.systemInfo.apply_count}}</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">group</v-icon>
                    <span class="subheading">{{$store.state.systemInfo.group_count}}</span>
                </v-layout>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            Avataaars: () => import(/* webpackChunkName: "group" */"@/components/Avataaars.vue")
        }
    })
    export default class HelloCard extends Vue {
    }
</script>

