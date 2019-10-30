<template>
    <div class="flex">
        <tip-card class="flex-item">报名已经结束</tip-card>
        <my-group v-if="$store.state.currentUser" class="flex-item" is-end></my-group>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            MyGroup: () => import(/* webpackChunkName: "group" */"@/components/Group/MyGroup.vue"),
            TipCard: () => import(/* webpackChunkName: "home" */"@/components/Card/TipCard.vue"),
        }
    })
    export default class End extends Vue {
        private show?: boolean = false;
    }
</script>
