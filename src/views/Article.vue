<template>
  <div class="container mx-auto my-5 px-5">
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
    console.log(this.$route.params.id);
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
