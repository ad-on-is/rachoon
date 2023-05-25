<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue"]);
const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  content: props.modelValue,
  onUpdate: () => {
    emit("update:modelValue", editor.value.getHTML());
  },
  editorProps: {
    attributes: {
      class: "prose prose-sm focus:outline-none",
    },
  },
});
</script>

<template>
  <div class="bg-base-300 p-5 rounded-lg">
    <div>
      <button
        class="btn btn-square btn-xs mr-1"
        @click="editor.commands.toggleBold()"
      >
        <FaIcon icon="fa-solid fa-bold" />
      </button>
      <button
        class="btn btn-square btn-xs mr-1"
        @click="editor.commands.toggleItalic()"
      >
        <FaIcon icon="fa-solid fa-italic" />
      </button>
      <button
        class="btn btn-square btn-xs mr-1 ml-5"
        @click="editor.commands.toggleHeading()"
      >
        <FaIcon icon="fa-solid fa-heading" />
      </button>
      <button
        class="btn btn-square btn-xs mr-1"
        @click="editor.commands.toggleBlockquote()"
      >
        <FaIcon icon="fa-solid fa-quote-left" />
      </button>
      <button
        class="btn btn-square btn-xs mr-1 ml-5"
        @click="editor.commands.toggleBulletList()"
      >
        <FaIcon icon="fa-solid fa-list" />
      </button>
      <button
        class="btn btn-square btn-xs mr-1"
        @click="editor.commands.toggleOrderedList()"
      >
        <FaIcon icon="fa-solid fa-list-ol" />
      </button>
    </div>
    <div class="divider m-0 mb-2"></div>
    <editor-content :editor="editor" />
  </div>
</template>

<style lang="scss">
.ProseMirror {
  li {
    @apply m-0 p-0;
    p {
      @apply m-0 p-0;
    }
  }
}
</style>
