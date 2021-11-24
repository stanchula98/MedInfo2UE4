<template>
  <div width="100%" height="100%" style="height: 100%; margin-top: 20px">
    <v-data-table
      style="margin: 20px"
      v-if="show_data"
      :headers="header"
      :items="items"
      class="elevation-3"
    ></v-data-table>
    <v-container v-else align-bottom style="height: 50px; margin-top: 20px">
      <v-row style="height: 100%">
        <v-alert text type="warning" style="width: 100%">
          Bitte Wählen Sie eine(n) Patient(in) aus und dessen Vitalparameter
        </v-alert>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["header", "items", "show_data"],
  data: () => {
    return {
      //   headers: null,
      //   vital_data: null,
      //   showTable: false,
    };
  },
  methods: {},
};
</script>