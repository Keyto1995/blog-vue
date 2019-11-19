<template>
  <div>
    <ArticleListItem :article="articles[0]" />
  </div>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem.vue";
export default {
  name: "ArticleList",
  components: {
    ArticleListItem,
  },
  data() {
    return {
      articles: [
        {
          id: 12,
          title: "title",
          description: "aescription",
          tags: [{ name: "name" }],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
