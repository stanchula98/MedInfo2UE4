<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        MedInfo2 UE 4
      </div>

      <v-spacer></v-spacer>
      <v-select
        :items="guids"
        style="top: 10px; width: 60px"
        id="select"
        label="Patient"
        v-model="selectedGUID"
        @change="check_show_data"
      ></v-select>
      <div style="width: 10px" />
      <v-select
        :items="items"
        style="top: 10px; width: 60px"
        label="Vitalparameter"
        @change="check_show_data"
        v-model="selectedItem"
      ></v-select>
    </v-app-bar>

    <div>
      <DataTable
        v-if="show_table"
        :item="selectedItem"
        :show_data="show_data"
        :GUID="selectedGUID"
        :header="header"
        :items="data"
      />
      <!-- <Chart v-else :item="selectedItem" /> /-->
    </div>
  </v-app>
</template>

<script>
//import Chart from "./components/Chart";
import DataTable from "./components/DataTable.vue";
import metaData from "./parsed_data/Metadaten.json";
import bloodsugar_json from "./parsed_data/Blutzucker.json";

var guid = [];

for (var i = 1; i < metaData.length; i++) {
  guid.push(metaData[i].GUID);
}

export default {
  name: "App",

  components: {
    //Chart,
    DataTable,
  },

  data: () => ({
    items: ["Blutdruck", "Blutzucker", "Gewicht"],
    header: [
      {
        text: "Zeitpunkt",
        value: "timestamp",
      },
      {
        text: "Blutzuckerspiegel in mg/dl",
        value: "value",
      },
    ],
    guids: guid,
    selectedItem: null,
    selectedGUID: null,
    show_table: true,
    show_data: false,
    data: null,
  }),
  methods: {
    check_show_data: function () {
      if (this.selectedGUID != null && this.selectedItem != null) {
        this.vital_parameter();
        this.show_data = true;
      }
    },
    vital_parameter: function () {
      var result = [];
      switch (this.selectedItem) {
        case "Blutzucker":
          bloodsugar_json.forEach((elem) => {
            if (elem.GUID == this.selectedGUID) {
              var date = elem.timestamp.split(" ")[0];
              // var year = date.split("-")[0];
              // var month = date.split("-")[1];
              // var day = date.split("-")[2];
              result.push({
                timestamp: date,
                value: elem.value[0],
              });
            }
            //return result;
            console.log(elem);
          });
          console.log(this.selectedGUID);
          this.data = result;
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
#select {
  top: 50px !important;
}
</style>

