<template>
  <div class="container mx-auto my-5 px-5">
    <MarkdownEditor ref="mdEditor" :value="article.content" />
    <a-select
      mode="multiple"
      class="w-full"
      :value="selectedTagIds"
      @change="value => (this.selectedTagIds = value)"
      placeholder="Please select"
    >
      <a-select-option v-for="tag in tags" :key="tag.id">
        {{ tag.name }}
      </a-select-option>
    </a-select>
    <a-popover
      title="Ready to publish you article"
      trigger="click"
      placement="bottom"
    >
      <template slot="content">
        <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio class="block" :value="1">
            <span class="inline-block text-lg">Set it live now</span>
            <span class="block">Publish this post immediately</span>
          </a-radio>
          <a-radio class="block" :value="2">
            <span class="inline-block text-lg">Schedule it for later</span>
            <a-date-picker
              class="block"
              @change="onChange"
              :disabledDate="current => current < moment().subtract(1, 'days')"
            />
            <span class="block">Set automatic future publish date</span>
          </a-radio>
        </a-radio-group>
      </template>
      <a-button type="primary">Click me</a-button>
    </a-popover>
  </div>
</template>

<script>
import moment from "moment";
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
    moment,
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

    onChange(value) {
      console.log(value);
    },
  },
};
</script>
