<template>
  <div class="flex flex-wrap">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="w-full lg:w-1/2 mb-2"
    >
      <div
        class="px-4 bg-gray-900 text-gray-100 flex rounded-lg justify-between items-center py-4"
        :class="[index % 2 === 0 ? 'lg:mr-2' : 'lg:ml-2']"
      >
        <font-awesome-icon
          class="text-xs md:text-base mr-4"
          :class="[
            item.priority === 'high' ? 'text-green-500' : '',
            item.priority === 'low' ? 'text-red-500' : ''
          ]"
          :icon="['fad', 'circle']"
        ></font-awesome-icon>
        <div class="flex-1 flex items-center">
          <img class="h-6 md:h-8 mr-2" :src="item.product.icon_url" alt="" />
          <span class="break-all" v-text="item.product.name"></span>
        </div>
        <span
          v-if="item.price"
          class="flex-shrink font-medium font-mono flex text-sm md:text-base"
        >
          <span v-text="$formatCurrency.format(item.price / 100)"></span
          ><span class="text-xs md:text-sm text-gray-600 self-start">*</span>
        </span>
        <span v-else class="text-xs md:text-sm">Preis auf Anfrage</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>
