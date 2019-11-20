<template>
  <div class="markdown-body" v-html="compiledMarkDown"></div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js/lib/index";
import "github-markdown-css";
import "highlight.js/styles/github.css";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

export default {
  name: "Markdown",
  props: {
    md: String,
  },
  computed: {
    compiledMarkDown: function() {
      return this.md ? marked(this.md) : "";
    },
  },
  methods: {},
};
</script>
