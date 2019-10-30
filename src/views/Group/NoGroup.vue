<template>
    <div class="flex">
        <create-group class="flex-item"></create-group>
        <group-list class="flex-item"></group-list>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            GroupList: () => import(/* webpackChunkName: "group" */"@/components/Group/GroupList.vue"),
            CreateGroup: () => import(/* webpackChunkName: "group" */"@/components/Group/CreateGroup.vue")
        }
    })
    export default class NoGroup extends Vue {
    }
</script>
