<template>
  <div id="app">
    <header class="flex bg-white border-b border-gray-200 fixed inset-x-0 h-16 items-center">
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
    <div class="h-16"></div>
    <router-view />
  </div>
</template>

<style lang="scss"></style>
