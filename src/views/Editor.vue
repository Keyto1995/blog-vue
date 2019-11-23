<template>
  <div class="container mx-auto my-5 px-5">
    <MarkdownEditor ref="mdEditor" :value="content" />
    <a-textarea placeholder="Title" v-model="title" />
    <a-textarea placeholder="Description" :rows="4" v-model="description" />
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
    <a-button @click="saveArticle(true)">Save as Draft</a-button>
    <a-popover
      v-if="isNew || isDraft"
      title="Ready to publish you article"
      trigger="click"
      placement="bottom"
    >
      <template slot="content">
        <a-radio-group class="block" name="radioGroup" v-model="publishNow">
          <a-radio class="block" :value="true">
            <span class="inline-block text-lg">Set it live now</span>
            <span class="block">Publish this post immediately</span>
          </a-radio>
          <a-radio class="block" :value="false">
            <span class="inline-block text-lg">Schedule it for later</span>
            <a-date-picker
              class="block"
              :disabled="publishNow"
              @change="onChange"
              :disabledDate="current => current < moment().subtract(1, 'days')"
            />
            <span class="block">Set automatic future publish date</span>
          </a-radio>
        </a-radio-group>
        <div class="flex justify-end">
          <a-button type="dashed">Cancel</a-button>
          <a-button type="primary" @click="saveArticle(false)"
            >Publish</a-button
          >
        </div>
      </template>
      <a-button type="primary">Publish</a-button>
    </a-popover>
    <a-button v-else @click="saveArticle(false)">Update</a-button>
    <span>{{ isNew ? "New" : isDraft ? "Draft" : "Published" }}</span>
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
      id: null,
      title: "",
      description: "",
      content: "",
      publishNow: true,
      publishDate: null,
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
  computed: {
    isNew() {
      return this.id === null;
    },
    isDraft() {
      return this.publishDate === null;
    },
  },
  methods: {
    moment,
    initStatus(article) {
      if (article.id) {
        this.id = article.id;
        this.title = article.title;
        this.description = article.description;
        this.content = article.content;
        if (article.publishDate) {
          this.publishNow = false;
          this.publishDate = article.publishDate;
        } else {
          this.publishNow = true;
          this.publishDate = null;
        }

        this.selectedTagIds = article.tags.map(tag => tag.id);
      }
    },
    getArticle(id) {
      this.$axios.get(`/articles/${id}`).then(response => {
        let article = response.data;
        this.initStatus(article);
      });
    },
    getTags() {
      this.$axios.get(`/tags/`).then(response => {
        this.tags = response.data;
      });
    },

    getContent() {
      return this.$refs.mdEditor.getValue();
    },
    getHtml() {
      return this.$refs.mdEditor.getHtml();
    },
    saveArticle(asDraft) {
      let data = {};
      data.title = this.title;
      data.description = this.description;
      data.content = this.getContent();
      data.tags = this.selectedTagIds.map(id =>
        this.tags.find(tag => tag.id === id)
      );
      if (asDraft) {
        data.publishDate = null;
      } else {
        if (this.publishNow) {
          // 立刻发布
          data.publishDate = moment().unix() * 1000;
        } else {
          // 按设定时间发布
          data.publishDate = this.publishDate.unix() * 1000;
        }
      }
      if (this.isNew) {
        this.$axios.post(`/articles/`, data).then(response => {
          this.initStatus(response.data);
        });
      } else {
        this.$axios.put(`/articles/${this.id}`, data).then(response => {
          this.initStatus(response.data);
        });
      }
    },

    onChange(value) {
      this.publishDate = value;
    },
  },
};
</script>
