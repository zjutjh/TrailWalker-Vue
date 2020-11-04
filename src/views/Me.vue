<template>
    <div class="flex">
        <transition name="slide-x-transition">
            <router-view/>
        </transition>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Me extends Vue {
        private async mounted() {
            await this.$store.dispatch("getMyInfo");
            if (this.$store.state.currentUser === null) {
                await this.$router.replace("/Me/create");
            }
        }
    }
</script>
