<template>
  <span @click="toggle"
    class="mx-1 my-1 cursor-pointer inline-flex rounded-full items-center py-0.5 px-2.5 text-sm font-medium select-none shadow"
    :class="{
      'bg-brand text-red-100': selected,
      'bg-gray-200 text-gray-700': !selected
    }"
  >
    {{ name }}
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      selected: false,
    }
  },

  methods: {
    toggle() {
      this.selected
        ? this.unselect()
        : this.select();
    },

    select() {
      this.selected = true;

      this.$emit("added", this.name);
    },

    unselect() {
      this.selected = false;

      this.$emit("removed", this.name);
    }
  }
};
</script>
