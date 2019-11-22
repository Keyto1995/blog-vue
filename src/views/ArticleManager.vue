<template>
  <div class="container m-auto p-5">
    <a-button @click="newArticle()">New Article</a-button>
    <a-table :columns="columns" rowKey="id" :dataSource="articles">
      <template slot="title_" slot-scope="title">
        <span class="text-lg font-semibold">{{ title }}</span>
      </template>
      <template slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
      </template>
      <template slot="actions" slot-scope="actions, record">
        <router-link :to="{ name: 'editor', query: { id: record.id } }">
          Edit
        </router-link>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    scopedSlots: { customRender: "title_" },
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "ACTIONS",
    key: "actions",
    scopedSlots: { customRender: "actions" },
  },
];

export default {
  name: "articleManager",
  data() {
    return {
      columns,
      articles: [],
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.$axios.get("/articles/all").then(response => {
        this.articles = response.data.content;
      });
    },
    newArticle() {
      this.$router.push("/editor");
    },
  },
};
</script>
