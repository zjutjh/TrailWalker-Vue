<template>
    <div class="mx-auto flex-item" style="max-width:30rem;">
        <h1>我的队伍</h1>
        <v-card class="radius-card text-center">
            <v-card-title class="text-center">
                等待加入
            </v-card-title>
            <v-card-text>
                请耐心等待队长回应
            </v-card-text>
            <v-card-actions style="display:block;">
                <div >
                    <v-btn color="error" @click="cancel">取消</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Inject} from "vue-property-decorator";
    import {API, apiMap} from "@/utils/api/api";

    import {postData} from "@/utils/fetch";
    import IGroup from "@/interface/IGroup";

    @Component({components: {}})
    export default class WaitJoin extends Vue {
        @Inject()
        private showErr!: any;

        private cancel() {
            postData(API(apiMap.deleteApply))
                .then((res) => {
                    if (res.code !== 1) {
                        return;
                    }
                    this.$router.push("/Group");
                });
        }

    }
</script>
