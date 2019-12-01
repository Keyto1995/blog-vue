<template>
  <div class="home">
    <div class="container mx-auto px-5">
      <ul>
        <li
          class="my-4 px-6 py-3 bg-gray-100 border border-gray-400"
          v-for="article in articles"
          :key="article.id"
        >
          <router-link :to="'/articles/' + article.id">
            <span class="block text-teal-600 text-xl">{{ article.title }}</span>
            <span>{{ article.description }}</span>
          </router-link>
          <hr class="my-2" v-if="article.tags.length > 0" />
          <div class="px-4" v-if="article.tags.length > 0">
            标签：
            <ul class="inline">
              <li
                class="mr-1 rounded-full border-dashed border bg-gray-300 inline-block px-2"
                v-for="tag in article.tags"
                :key="tag.id"
              >
                <router-link :to="'/tags/' + tag.id">
                  <span>{{ tag.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.$axios.get("/articles/published").then(response => {
        this.articles = response.data.content;
      });
    },
  },
};
</script>
