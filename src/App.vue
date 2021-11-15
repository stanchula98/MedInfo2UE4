<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-select
        :items="guids"
        label="Patient"
        v-model="selectedGUID"
        @change="check_show_data"
      ></v-select>
      <v-select
        :items="items"
        label="Vitalparameter"
        @change="check_show_data"
        v-model="selectedItem"
      ></v-select>
    </v-app-bar>

    <v-main>
      <DataTable
        v-if="show_table"
        :item="selectedItem"
        :show_data="show_data"
        :GUID="selectedGUID"
        :header="header"
        :items="data"
      />
      <Chart v-else :item="selectedItem" />
    </v-main>
  </v-app>
</template>

<script>
import Chart from "./components/Chart";
import DataTable from "./components/DataTable.vue";
import metaData from "./parsed_data/Metadaten.json";
import bloodsugar_json from "./parsed_data/Blutzucker.json"

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
    items: ["Blutdruck", "Blutzucker", "Gewicht"],
    header: [
      {
        text: "Zeitpunkt",
        value: "timestamp"
      },
      {
        text: "Blutzuckerspiegel in mg/dl",
        value: "value"
      }
    ],
    guids: guid,
    selectedItem: null,
    selectedGUID: null,
    show_table: true,
    show_data: false,
    data: null
  }),
  methods:{
    check_show_data: function(){
      if(this.selectedGUID != null && this.selectedItem != null){
        this.vital_parameter()
        this.show_data = true;
      }
    },
    vital_parameter: function(){
        var result = []
        switch (this.selectedItem){
          case "Blutzucker":
            bloodsugar_json.forEach((elem) => {
            if (
                elem.GUID == this.selectedGUID 
              ) {
                var date = elem.timestamp.split(" ")[0];
                // var year = date.split("-")[0];
                // var month = date.split("-")[1];
                // var day = date.split("-")[2];
                result.push({
                  timestamp: date,
                  value: elem.value[0]
                })
            }
            //return result;
            console.log(elem)
          });
              console.log(this.selectedGUID)
            this.data = result;
            break;
        }
    }
  }
};
</script>
