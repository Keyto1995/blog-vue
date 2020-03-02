<template>
  <div id="app" class="text-gray-900 flex flex-col h-full">
    <header
      class="flex bg-white border-b border-gray-200 flex-initial inset-x-0 h-16 items-center"
    >
      <div class="w-full px-6">
        <div class="flex items-center justify-between">
          <div class="w-48">
            <router-link to="/">
              <span class="text-2xl truncate">Keytoの个人博客</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <router-view class="flex-auto" />
    <footer class="flex bg-teal-500 h-12 items-center">
      <section class="container mx-auto">
        © 2016-2020 keyto.top 版权所有 ICP证：
        <a
          href="http://www.beian.miit.gov.cn"
          class="hover:text-pink-600"
          target="_blank"
          >苏ICP备18009894号</a
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style lang="scss"></style>
