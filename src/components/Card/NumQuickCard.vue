<template>
  <v-sheet
      class="mx-auto"
      :style="getColor()"
      elevation="5"
      min-width="100"
      max-width="200"
      rounded="xl"
      style="padding: 0.5rem"
  >
    <div style="color: white;font-size: 10vh;">
      {{ value }}
    </div>
    <div style="color: white;">
      {{ label }}
    </div>


  </v-sheet>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class CurrentGroupCountCard extends Vue {
  @Prop({
    type: Number,
    default: 0
  })
  private value?: string | number;

  @Prop({
    type: String,
    default: ""
  })
  private label?: string;

  private getColor() {
    const r = parseInt((Math.random() * 256).toString(), 0);
    const g = parseInt((Math.random() * 256).toString(), 0);
    const b = parseInt((Math.random() * 256).toString(), 0);
    return `background-color:rgba(${r},${g},${b},0.3)`;
  }
}
</script>

