<template>
    <div class="flex">
        <my-group class="flex-item"></my-group>
        <apply-list class="flex-item"  v-if="$store.state.currentUser&&$store.state.currentUser.state === 3"></apply-list>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            MyGroup: () => import(/* webpackChunkName: "group" */"@/components/Group/MyGroup.vue"),
            ApplyList: () => import(/* webpackChunkName: "group" */"@/components/Group/ApplyList.vue"),
        }
    })
    export default class HaveGroup extends Vue {
    }
</script>
