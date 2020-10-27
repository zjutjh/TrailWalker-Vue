<template>
    <v-avatar :size="size">
        <v-img :src="src" alt="" aspect-ratio="1" >
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
                </v-row>
            </template>
        </v-img>
    </v-avatar>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    @Component
    export default class Avataaars extends Vue {

        @Prop({
            type: String,
            default: "http://47.103.1.116/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        })
        private src?: string;

        @Prop({
            type: Number,
            default: 96})
        private size?: string;
    }

</script>
