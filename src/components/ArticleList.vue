<template>
  <div>
    <ArticleListItem :article="article" />
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
      article: {
        id: 12,
        title: "title",
        description: "aescription",
        tags: [
          {name: "name"},
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
