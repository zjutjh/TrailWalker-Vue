<template>
    <div class="flex">
        <transition name="slide-x-transition">
            <router-view/>
        </transition>
    </div>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import GroupList from "@/components/Group/GroupList.vue";
    import ApplyList from "@/components/Group/ApplyList.vue";
    import MyGroup from "@/components/Group/MyGroup.vue";
    import CreateGroup from "@/components/Group/CreateGroup.vue";

    @Component({components: {GroupList, MyGroup, CreateGroup, ApplyList}})
    export default class Group extends Vue {
        private mounted() {
            this.$store.dispatch("getMyInfo");
            if (this.$store.state.currentUser.state <= 1) {
                this.$router.push("/Group/No");
                return;
            }
            if (this.$store.state.currentUser.state === 2) {
                this.$router.push("/Group/Wait");
                return;
            }
        }
    }
</script>
