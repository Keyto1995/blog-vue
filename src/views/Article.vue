<template>
  <div class="container mx-auto">
    <Markdown :md="article.content" />
  </div>
</template>

<script>
import Markdown from "@/components/Markdown";

export default {
  name: "article_",
  components: {
    Markdown,
  },
  data() {
    return {
      article: Object,
    };
  },
  beforeMount() {
    this.getArticle(17080025777963008);
  },
  methods: {
    getArticle(id) {
      this.$axios.get(`/articles/${id}`).then(response => {
        this.article = response.data;
      });
    },
  },
};
</script>
