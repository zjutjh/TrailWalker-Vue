<template>
    <div class="flex">
        <tip-card class="flex-item mx-auto">欢迎报名精弘毅行</tip-card>
        <v-card class="flex-item mx-auto" elevation="4" max-width="25rem">
            <v-card-title>特别提醒</v-card-title>
            <v-card-text>请关注浙江工业大学精弘网络微信公众号,队伍编号信息后续发放。请务必关注浙江工业大学精弘网络及时查收出发时间和其它重要通知。</v-card-text>
        </v-card>
        <my-card class="flex-item mx-auto"></my-card>

        <hello-card class="flex-item mx-auto"></hello-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            MyCard: () => import(/* webpackChunkName: "home" */"@/components/Card/MyCard.vue"),
            HelloCard: () => import(/* webpackChunkName: "home" */"@/components/Card/HelloCard.vue"),
            TipCard: () => import(/* webpackChunkName: "home" */"@/components/Card/TipCard.vue"),
        }
    })
    export default class Home extends Vue {
        private async mounted() {
            await this.$store.dispatch("getMyInfo");
        }
    }
</script>
