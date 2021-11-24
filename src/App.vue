<template>
  <v-app>
    <v-app-bar app color="primary" dark fixed>
      <div class="d-flex align-center">MedInfo2 UE 4</div>

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
    <div style="margin-top: 80px">
      <div v-if="show_meta">
        <v-toolbar elevation="1"  style="margin: 20px">
          <div>Geschlecht: {{gender}}</div>
        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <div>Wohnort: {{town}}</div>
        <v-spacer></v-spacer>
               <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <div>Alter: {{age}}</div>
        
      </v-toolbar>
    <v-divider></v-divider> 
      </div>
         

    </div>


    <div>
      <DataTable
        v-if="show_table"
        :item="selectedItem"
        :show_data="show_data"
        :GUID="selectedGUID"
        :header="header"
        :items="data"
      />
      <Chart v-else-if="show_chart" 
        :item="selectedItem" 
        :labels="labels"
        :data="data"
      /> 
    </div>
  </v-app>
</template>

<script>
import Chart from "./components/Chart";
import DataTable from "./components/DataTable.vue";
import metaData from "./parsed_data/Metadaten.json";
import bloodsugar_json from "./parsed_data/Blutzucker.json";
import bloodpreassure_json from "./parsed_data/Blutdruck.json";
import weight_json from "./parsed_data/Gewicht.json"
import steps_json from "./parsed_data/Schritte.json"

var guid = [];

for (var i = 1; i < metaData.length; i++) {
  guid.push(metaData[i].GUID);
}

export default {
  name: "App",

  components: {
    Chart,
    DataTable,
  },

  data: () => ({
    items: ["Blutdruck", "Blutzucker", "Gewicht", "Schritte"],
    header: null,
    guids: guid,
    selectedItem: null,
    selectedGUID: null,
    show_table: true,
    show_chart: false,
    show_data: false,
    show_meta: false,
    gender: null,
    age: null,
    town: null,
    data: null,
    dataSets: [],
    labels: null,
  }),
  methods: {
    reload_meta: function() {
      metaData.forEach(item => {
        if(item.GUID == this.selectedGUID){
          switch (item.gender){
            case "female":
              this.gender = "Weiblich"
              break;
            case "male":
              this.gender = "Männlich"
              break;
          }
          this.age = item.ageGroup
          this.town = item.placeOfResidence
        }
      })
    },
    check_show_data: function () {
      if (this.selectedGUID != null && this.selectedItem != null) {
        this.vital_parameter();
        this.reload_meta()
        this.show_data = true;

      } else if(this.selectedGUID != null){
        this.show_meta = true;
        this.reload_meta()
      }
    },
    vital_parameter: function () {
      var result = [];
      switch (this.selectedItem) {
        case "Blutzucker":
        this.show_chart = false
        this.show_table = true;
          bloodsugar_json.forEach((elem) => {
            if (elem.GUID == this.selectedGUID) {
              var date = elem.timestamp.split(" ")[0];
              result.push({
                timestamp: date,
                value: elem.value[0],
              });
            }
          });
          this.header = [
            {
              text: "Zeitpunkt",
              value: "timestamp",
            },
            {
              text: "Blutzuckerspiegel in mg/dl",
              value: "value",
            },
          ];
          this.data = result;
          break;

        case "Blutdruck":
        this.show_chart = false
        this.show_table = true;
          bloodpreassure_json.forEach((elem) => {
            if (elem.GUID == this.selectedGUID) {
              var date = elem.timestamp.split(" ")[0];
              result.push({
                timestamp: date,
                systole: elem.value[0],
                diastole: elem.value[1],
                bpm: elem.value[2]
              });
            }
          });
          this.header = [
            {
              text: "Zeitpunkt",
              value: "timestamp",
            },
            {
              text: "Systolisch mm/hg",
              value: "systole",
            },
            {
              text: "Diastolisch mm/hg",
              value: "diastole",
            },
            {
              text: "Herzrate bpm",
              value: "bpm",
            }
          ];
          this.data = result;
          break;

          case "Gewicht":
        this.show_chart = false
        this.show_table = true;
            weight_json.forEach((elem) => {
            if (elem.GUID == this.selectedGUID) {
              var date = elem.timestamp.split(" ")[0];
              result.push({
                timestamp: date,
                weight: elem.value[0]
              });
            }
          });
          this.header = [
            {
              text: "Zeitpunkt",
              value: "timestamp",
            },
            {
              text: "Gewicht in kg",
              value: "weight",
            }
          ];
          this.data = result;
          break;

        default:
          break;
      
      case "Schritte":
        this.show_chart = true
        this.show_table = false
        steps_json.forEach(item => {
          if(item.GUID == this.selectedGUID){
            this.data = [{
              name: "Schritte",
              chartType: "bar",
              values: item.steps
            }]
            this.labels = []
            var i = 1
            item.steps.forEach(() => {
              this.labels.push(`Tag ${i}`)
              i++
            })
          }
        })
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

