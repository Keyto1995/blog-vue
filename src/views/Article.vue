<template>
  <div class="container mx-auto my-5 px-5">
    <h1 class="text-4xl font-bold">{{ article.title }}</h1>
    <hr class="my-3" />
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
    this.getArticle(this.$route.params.id);
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
