<template>
  <div class="home">
    <div class="container mx-auto">
      <ArticleList/>
    </div>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
export default {
  name: "home",
  components: {
    ArticleList,
  },
};
</script>
