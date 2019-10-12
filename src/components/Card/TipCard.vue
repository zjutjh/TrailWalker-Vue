<template>
    <v-card class="flex-item mx-auto" style="max-width:25rem;">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

        <v-card-title>
            <div>欢迎报名精弘毅行</div>
            <span class="grey--text subtitle-1">文稿征集中</span>
        </v-card-title>

        <v-card-actions>

            <v-btn text color="purple" @click="$router.push('/dis')">免责声明</v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't
                    have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with
                    that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry?
                    I've got to find a way to escape.
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class TipCard extends Vue {
        private show = false;
    }
</script>
