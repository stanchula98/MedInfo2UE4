<template>
  <div>
    <vue-frappe
      id="test"
      :labels="labels"
      title="Schrtte"
      type="axis-mixed"
      :height="300"
      :colors="['purple']"
      :dataSets="data"
    >
    </vue-frappe>
  </div>
</template>
<script>


export default {
    props:['item', "labels", "data"],
  data: () => {
    return {
    };
  },
  methods: {
  },
};
</script>