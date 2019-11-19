<template>
  <div
    class="my-4 px-6 py-3 bg-gray-100 border border-gray-400"
    th:each="article,articleStat:${articles}"
  >
    <a :href="'/articles/'+article.id">
      <span class="block text-teal-600 text-xl">{{article.title}}</span>
      <span>{{article.description}}</span>
    </a>
    <hr class="my-2" />
    <div class="px-4">
      标签：
      <ul class="inline">
        <li
          class="rounded-full border-dashed border bg-gray-300 inline-block px-2"
          th:each="tag,tagStat:${article.getTags()}"
        >
          <a th:href="@{'/tags/'+${tag.id}}">
            <span>{{article.tags[0].name}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleListItem",
  props: {
    article: {},
  },
};
</script>

<style lang="scss" scoped>
</style>
