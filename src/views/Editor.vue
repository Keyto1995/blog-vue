<template>
  <div class="container mx-auto my-5 px-5">
    <MarkdownEditor />
  </div>
</template>

<script>
import MarkdownEditor from "../components/MarkdownEditor";

export default {
  name: "editor",
  components: {
    MarkdownEditor,
  },
};
</script>
