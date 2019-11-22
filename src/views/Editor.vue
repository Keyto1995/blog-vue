<template>
  <div class="container mx-auto my-5 px-5">
    <MarkdownEditor ref="mdEditor" :value="article.content" />
    <a-select
      mode="multiple"
      class="w-full"
      :value="selectedTagIds"
      @change="handleChange"
      placeholder="Please select"
    >
      <a-select-option v-for="tag in tags" :key="tag.id">
        {{ tag.name }}
      </a-select-option>
    </a-select>
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
      selectedTagIds: [],
      tags: [],
    };
  },
  beforeMount() {
    if (this.$route.query.id) {
      this.getArticle(this.$route.query.id);
    }
    this.getTags();
  },
  methods: {
    getArticle(id) {
      this.$axios.get(`/articles/${id}`).then(response => {
        this.article = response.data;
        this.selectedTagIds = this.article.tags.map(tag => tag.id);
      });
    },
    getTags() {
      this.$axios.get(`/tags/`).then(response => {
        this.tags = response.data;
      });
    },

    getValue() {
      return this.$refs.mdEditor.getValue();
    },
    getHtml() {
      return this.$refs.mdEditor.getHtml();
    },

    handleChange(value) {
      this.selectedTagIds = value;
    },
  },
};
</script>
