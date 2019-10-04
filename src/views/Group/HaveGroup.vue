<template>
    <div class="flex">
        <my-group class="flex-item" ></my-group>
        <apply-list class="flex-item" v-if="$store.state.currentUser.state===4"></apply-list>
    </div>
</template>
<script lang="ts">

    import { Component, Vue} from "vue-property-decorator";
    import GroupList from "@/components/Group/GroupList.vue";
    import ApplyList from "@/components/Group/ApplyList.vue";
    import MyGroup from "@/components/Group/MyGroup.vue";
    import CreateGroup from "@/components/Group/CreateGroup.vue";
    @Component({ components: { GroupList, MyGroup, CreateGroup, ApplyList} })
    export default class HaveGroup extends Vue {}
</script>
