<template>
  <div>
    <v-date-picker
      v-model="date"
      :type="dateType"
      full-width
      :allowed-dates="allowedDates"
      class="mt-4"
      :min="this.min"
      :max="this.max"
      @change="setDate"
    ></v-date-picker>
    <vue-frappe
      id="test"
      :labels="labels"
      title="My Awesome Chart"
      type="axis-mixed"
      :height="300"
      :colors="['purple', '#ffa3ef', 'light-blue']"
      :dataSets="data"
    >
    </vue-frappe>
    <div>sadfasd{{item}}</div>
  </div>
</template>
<script>
import bloodpreassure_json from "../parsed_data/Blutzucker.json";
import bloodsugar_json from "../parsed_data/Blutzucker.json";
import weight_json from "../parsed_data/Gewicht.json";
// console.log(bloodpreassure_json);
var la = [];
var sys = [];
var dia = [];
var b = [];
var bs = [];
var w = [];

var datesMonth = [];
var datesDay = [];
// var count = 0;
var year = "";
var month = "";
var date = "";
var day = "";

bloodpreassure_json.forEach((elem) => {
  if (elem.GUID == "AD527075-9CFC-4E14-A352-0119719C107F") {
    date = elem.timestamp.split(" ")[0];
    year = date.split("-")[0];
    month = date.split("-")[1];
    day = date.split("-")[2];
    la.push(`${year}-${month}-${day}`);
    datesMonth.push(`${year}-${month}`);
    datesDay.push(`${year}-${month}-${day}`);
    sys.push(elem.value[0]);
    dia.push(elem.value[1]);
    b.push(elem.value[2]);
    // count++;
  }
});

bloodsugar_json.forEach((elem) => {
  if (elem.GUID == "AD527075-9CFC-4E14-A352-0119719C107F") {
    date = elem.timestamp.split(" ")[0];
    year = date.split("-")[0];
    month = date.split("-")[1];
    day = date.split("-")[2];
    la.push(`${year}-${month}-${day}`);
    datesMonth.push(`${year}-${month}`);
    datesDay.push(`${year}-${month}-${day}`);
    bs.push(elem.value[0]);
    // count++;
  }
});

weight_json.forEach((elem) => {
  if (elem.GUID == "AD527075-9CFC-4E14-A352-0119719C107F") {
    date = elem.timestamp.split(" ")[0];
    year = date.split("-")[0];
    month = date.split("-")[1];
    day = date.split("-")[2];
    la.push(`${year}-${month}-${day}`);
    datesMonth.push(`${year}-${month}`);
    datesDay.push(`${year}-${month}-${day}`);
    w.push(elem.value[0]);
    // count++;
  }
});
// console.log(la);

var bloodpreassure_data = [
        {
          name: "Systolisch",
          chartType: "bar",
          values: sys,
        },
        {
          name: "Diastolisch",
          chartType: "bar",
          values: dia,
        },
        {
          name: "Puls",
          chartType: "bar",
          values: b,
        },
      ];
    
var bloodsugar_data = [{
  name: "Blutzucker",
  chartType: "bar",
  values: bs
}]

// var weight_data = {
//   name: "Gewicht",
//   chartType: "bar",
//   values: w
// }

export default {
    props:['item'],
  data: () => {
    return {
      changeBtn: "Change to Date view",
      dateType: "date",
      test: "some text",
      labels: la,
      date: datesDay[datesDay.length - 1],
      min: datesDay[0],
      max: datesDay[datesDay.length - 1],
      data: null,
    };
  },
  methods: {
    changeView: function () {
      this.dateType = "date";
    },
    testtest: function () {
      this.test = "something else";
    },
    allowedDates: function (val) {
      // console.log(dates) ;
      return datesDay.indexOf(val) !== -1;
    },
    setDate: function (val) {
      console.log(this.data, val);

      dia = [];
      sys = [];
      b = [];
      bs = [];
      this.labels = [];

      switch(this.item){
        case "Blutdruck":
          bloodpreassure_json.forEach((elem) => {
            if (
              elem.GUID == "AD527075-9CFC-4E14-A352-0119719C107F" &&
              elem.timestamp.includes(val)
            ) {
              date = elem.timestamp.split(" ")[0];
              year = date.split("-")[0];
              month = date.split("-")[1];
              day = date.split("-")[2];
              this.labels.push(
                `Tag ${day}, ${elem.timestamp.split(" ")[1].split(".")[0]} Uhr`
              );
              sys.push(elem.value[0]);
              dia.push(elem.value[1]);
              b.push(elem.value[2]);
            }
          });
          this.data = bloodpreassure_data

          this.data[0].values = sys;
          this.data[1].values = dia;
          this.data[2].values = b;

          console.log(this.data)
          break;

        case "Blutzucker":
          bloodsugar_json.forEach((elem) => {
            if (elem.GUID == "AD527075-9CFC-4E14-A352-0119719C107F" &&
                        elem.timestamp.includes(val)) {
              date = elem.timestamp.split(" ")[0];
              year = date.split("-")[0];
              month = date.split("-")[1];
              day = date.split("-")[2];
              this.labels.push(
                `Tag ${day}, ${elem.timestamp.split(" ")[1].split(".")[0]} Uhr`
              );
              bs.push(elem.value[0]);
            }
          });
          bloodsugar_data.values = bs;
          
          this.data = [{
                        name: "Blutzucker",
                        chartType: "bar",
                        values: bs
                      }]

          console.log(this.data)
          break;
      }


      //   console.log(this.sys, this.b, this.la, this.dia);
      // alert(date)
    },
    
  },
};
</script>