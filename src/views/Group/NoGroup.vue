<template>
    <div class="flex">
        <create-group class="flex-item"></create-group>
        <group-list class="flex-item"></group-list>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import GroupList from "@/components/Group/GroupList.vue";
    import CreateGroup from "@/components/Group/CreateGroup.vue";

    @Component({components: {GroupList, CreateGroup}})
    export default class NoGroup extends Vue {
    }
</script>
