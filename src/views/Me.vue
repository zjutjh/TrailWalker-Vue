<template>
    <div class="flex">
        <transition name="slide-x-transition">
            <router-view/>
        </transition>
    </div>
</template>
<script lang="ts">


    import {Component, Vue} from "vue-property-decorator";
    import MyInfo from "@/components/User/MyInfo.vue";
    import CreateUser from "@/components/User/CreateUser.vue";

    @Component({components: {MyInfo, CreateUser}})
    export default class Me extends Vue {
        private mounted() {
            if (!this.$store.state.isLogin) {
                this.$router.push("/Me/create");
            }
        }
    }
</script>
