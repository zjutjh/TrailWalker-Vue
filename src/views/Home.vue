<template>
    <div class="flex">
        <tip-card class="flex-item mx-auto">欢迎报名精弘毅行</tip-card>
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
