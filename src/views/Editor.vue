<template>
  <div class="container mx-auto my-5 px-5">
    <MarkdownEditor ref="mdEditor" :value="article.content" />
    <a-button>Publish</a-button>
  </div>
</template>

<script>
import MarkdownEditor from "../components/MarkdownEditor";

export default {
  name: "editor",
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      article: Object,
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.getArticle(this.$route.query.id);
    }
  },
  methods: {
    getArticle(id) {
      this.$axios.get(`/articles/${id}`).then(response => {
        this.article = response.data;
      });
    },

    getValue() {
      return this.$refs.mdEditor.getValue();
    },
    getHtml() {
      return this.$refs.mdEditor.getHtml();
    },
  },
};
</script>
