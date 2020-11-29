<template>
  <div class="flex items-center my-2 mx-2 px-4 py-3 border-b border-gray-900">
    <img class="h-8 mr-4" :src="product.icon_url" alt="" />
    <div class="text-white flex-1" v-text="product.name"></div>
    <div
      class="text-white"
      v-text="`${product.pivot.quantity} Portionen`"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped></style>
