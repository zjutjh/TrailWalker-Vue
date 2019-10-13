<template>
    <div class="mx-auto" style="height:100%">
        <v-avatar width="5rem" height="5rem" class="island" style="z-index:99;">
            <v-img
                    :src="avax"
                    :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                    aspect-ratio="1"
            >
                <template v-slot:placeholder>
                    <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                    >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>

        </v-avatar>
        <v-card class="scroll drop" style="padding-top:2rem;border-radius: 30px 30px 0 0;height:100%;">
            <v-card-text>
                <v-form>
                    <v-select
                            v-for="(item,index) in avaList"
                            :key="index"
                            :items="item"
                            :label="labelList[index]"
                            v-model="axa[index]"
                            style="margin: -1rem 0 0;"
                    ></v-select>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
    import {Component,  Vue, Emit, Model} from "vue-property-decorator";
    @Component
    export default class AvataaarsGenerator extends Vue {
        private avatarStyle = ["Circle", "Transparent"];
        private topType = ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1",
            "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair", "LongHairBob", "LongHairBun",
            "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand",
            "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2",
            "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle",
            "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound",
            "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"];
        private accessoriesType = ["Blank", "Kurt", "Prescription01", "Prescription02",
            "Round", "Sunglasses", "Wayfarers"];
        private hairClor = ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02",
            "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow",
            "Pink", "Red", "White"];
        private facialHairType = ["Blank", "BeardMedium", "BeardLight", "BeardMagestic",
            "MoustacheFancy", "MoustacheMagnum"];
        private clothType = ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt",
            "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"];
        private eyeType = ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts",
            "Side", "Squint", "Surprised", "Wink", "WinkWacky"];
        private skin = ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"];
        private mouthType = ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"];
        private eyebrowType = ["Angry", "AngryNatural", "Default", "DefaultNatural",
            "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural",
            "UnibrowNatural", "UpDown", "UpDownNatural"];
        private avaList = [this.avatarStyle, this.topType, this.accessoriesType,
            this.hairClor, this.facialHairType, this.hairClor, this.clothType, this.hairClor,
            this.eyeType, this.eyebrowType, this.mouthType, this.skin];
        private labelList = ["头像样式", "头顶", "配件", "发色", "胡子", "胡子颜色", "衣服",
            "衣服颜色", "眼睛", "表情", "嘴形", "肤色"];
        private axa: any = [];
        @Model("change", {type: String})
        private src?: string;

        @Emit("change")
        private change(t: any) {
            return t;
        }

        get avax() {
            const sc = `
http://walk.zjutjh.com/avataaars/?avatarStyle=${this.axa[0]}
&topType=${this.axa[1]}
&accessoriesType=${this.axa[2]}
&hairColor=${this.axa[3]}
&facialHairType=${this.axa[4]}
&facialHairColor=${this.axa[5]}
&clotheType=${this.axa[6]}
&clotheColor=${this.axa[7]}
&eyeType=${this.axa[8]}
&eyebrowType=${this.axa[9]}
&mouthType=${this.axa[10]}
&skinColor=${this.axa[11]}
`;
            this.change(sc);
            return sc;
        }

        private created() {
            this.avaList.forEach((element, i) => {
                this.axa[i] = element[this.randomNum(0, element.length - 1)];
            });
        }

        private  randomNum(minNum: number, maxNum: number) {
            return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        }
    }
</script>
<style>
    .island {
        margin-left: auto;
        margin-right: auto;
        margin-top: -5%;
        position: absolute;
        left: 0;
        right: 0;
    }
</style>
