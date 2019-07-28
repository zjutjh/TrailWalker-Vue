<template>
  <div class="mx-auto" style="max-width:30rem;">
    <h1>天气</h1>
    <v-card class="radius-card">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{current.city}}</v-list-item-title>
          <v-list-item-subtitle>{{current.update_time}},{{current.wea}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-layout align-center>
          <v-flex xs6 display-3>{{current.tem}}&deg;C</v-flex>
          <v-flex xs6>
            <v-img :src="WeatherImg" alt="weather image" width="92"></v-img>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-layout align-center>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{current.win_speed}}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{current.humidity}}</v-list-item-subtitle>
        </v-list-item>
      </v-layout>

      <v-divider></v-divider>
      <v-list class="transparent">
        <v-list-item v-for="item in forecast" :key="item.day">
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ iconList[item.wea_img] }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">{{ item.tem1 }}~{{item.tem2}}</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>详细天气</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import { getData } from "@/utils/fetch";
@Component
export default class Weather extends Vue {
  private iconList = {
    yun: "mdi-cloud",
    qing: "mdi-white-balance-sunny",
    xue: "mdi-ac-unit",
    lei: "mdi-flash-on"
  };
  private WeatherImg = "";
  private time = 0;
  private forecast: any = {};
  private current: any = {};
  private created() {
    getData("https://www.tianqiapi.com/api/", "").then((json) => {
      this.forecast = json.data.slice(0, 3);
    });
    getData("https://www.tianqiapi.com/api/?version=v6", "").then((json) => {
      this.current = json;
      this.WeatherImg = "./weather/" + json.wea_img + ".png";
    });
  }
}
</script>