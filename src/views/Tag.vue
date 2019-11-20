<template>
  <div class="container mx-auto my-5 px-5">
    <ul>
      <li v-for="(v, index) in tag" :key="index">{{ index }} : {{ v }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tag",
  data() {
    return {
      tag: Object,
    };
  },
  beforeMount() {
    this.getTag(this.$route.params.id);
  },
  methods: {
    getTag(id) {
      this.$axios.get(`/tags/${id}`).then(response => {
        this.tag = response.data;
      });
    },
  },
};
</script>
