<template>
  <div class="bg-gray-200">
    <div class="container mx-auto mx-5 py-5" id="app">
      <div class="flex justify-between m-5">
        <div class="text-3xl font-bold">Tags</div>
        <button
          @click="new_tag_form()"
          class="m-2 px-3 bg-green-400 text-white"
          type="button"
        >New Tag</button>
      </div>
      <div class="flex m-5 bg-white" style="height: 50rem">
        <div class="w-2/3 overflow-y-auto">
          <div
            :class="[selected_id===tag.id ? 'bg-teal-100' : '']"
            @click="select_tag(tag)"
            class="flex justify-between items-center p-5 border-b cursor-pointer"
            v-for="tag in tags"
            :key="tag.id"
          >
            <div class>
              <div class>
                <span class="text-xl font-bold">{{tag.name}}</span>
                <span class="rounded-sm bg-gray-200 text-gray-600 px-1">/{{tag.url}}</span>
              </div>
              <span class="text-gray-700">{{tag.description}}</span>
            </div>
            <div class="text-teal-700">{{tag.countArticle}}</div>
          </div>
        </div>
        <div class="flex flex-col px-5 w-1/3 border-l">
          <span class="my-5 text-lg font-semibold">Tag settings</span>
          <label class="mb-2 font-medium" for="tag_name">Name</label>
          <input
            @blur="init_tag_url()"
            class="border mb-4 px-3 py-1 w-full"
            id="tag_name"
            v-model.trim="new_tag.name"
          />

          <label class="mb-2 font-medium" for="tag_url">URL</label>
          <input class="border mb-4 px-3 py-1 w-full" id="tag_url" v-model.trim="new_tag.url" />

          <label class="mb-2 font-medium" for="tag_description">Description</label>
          <textarea
            class="border mb-4 px-3 py-1 w-full h-32"
            id="tag_description"
            v-model.trim="new_tag.description"
          ></textarea>
          <div class="flex justify-between">
            <button @click="delete_tag()" class="text-red-700">Delete Tag</button>
            <button @click="post_tag()" class="text-green-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagManager",
  data() {
    return {
      selected_id: 0,
      tags: [],
      new_tag: {},
    };
  },
  beforeMount() {
    this.init_tags();
  },
  methods: {
    init_tags: function() {
      this.$axios.get(`/tags/`).then(response => {
        this.tags = response.data;
        for (let tag of this.tags) {
          this._getCountByTag(tag);
        }
      });
    },
    new_tag_form: function() {
      this.selected_id = 0;
      this.new_tag = {};
    },
    select_tag: function(tag) {
      this.selected_id = tag.id;
      this.new_tag = {
        id: tag.id,
        name: tag.name,
        url: tag.url,
        description: tag.description,
      };
    },
    init_tag_url: function() {
      const tag_url = this.new_tag.url;
      const tag_name = this.new_tag.name;
      if (tag_name && (!tag_url || tag_url.trim().length === 0)) {
        this.new_tag.url = tag_name.toLowerCase();
      }
    },
    post_tag: function() {
      let data = this.new_tag;

      if (data.id) {
        this.$axios.put(`/tags/`, data).then(response => {
          this.select_tag(response.data);
          this.init_tags();
        });
      } else {
        this.$axios.post(`/tags/`, data).then(response => {
          this.select_tag(response.data);
          this.init_tags();
        });
      }
    },
    delete_tag: function() {
      const tag_id = this.selected_id;
      if (tag_id === 0) {
        this.new_tag_form();
      } else {
        this.$axios.delete(`/tags/${tag_id}`).then(() => {
          this.new_tag_form();
          this.init_tags();
        });
      }
    },
    _getCountByTag: function(tag) {
      this.$axios
        .get("/articles/countByTag", { params: { id: tag.id } })
        .then(response => {
          this.$set(tag, "countArticle", response.data);
        });
    },
  },
};
</script>
