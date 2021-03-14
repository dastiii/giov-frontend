<template>
  <div
    class="text-gray-100 bg-gray-900 border-b-2 border-gray-950 flex justify-between items-center first:rounded-t-lg space-x-4 px-2 py-2 "
  >
    <img class="h-8" :src="meal.product.icon_url" alt="" />
    <div class="flex-col items-center flex-1 min-w-0">
      <div class="truncate" v-text="meal.product.name"></div>
      <div class="font-light uppercase text-sm text-gray-300">
        Menge:
        <span class="font-semibold text-gray-100" v-text="amount"></span>
      </div>
    </div>
    <div
      class="font-mono text-left font-medium"
      v-text="
        $formatCurrency.format(
          amount * (meal.featured ? meal.sale_price / 100 : meal.price / 100)
        )
      "
    ></div>
    <button
      @click="$emit('removeFromCart', meal)"
      class="text-red-500 focus:outline-none focus:text-red-200"
    >
      <font-awesome-icon :icon="['fal', 'times']"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    meal: {
      type: Object,
      required: true
    },

    amount: {
      type: Number,
      required: true
    }
  }
};
</script>
