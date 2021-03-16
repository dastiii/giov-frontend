<template>
  <div
    class="flex items-center odd:bg-gray-900 even:bg-gray-950 text-gray-100 first:rounded-t-lg last:rounded-b-lg space-x-4 px-2"
  >
    <div class="py-3">
      <img :src="meal.product.icon_url" class="h-10" alt="" />
    </div>
    <div class="flex flex-col flex-1 min-w-0">
      <div class="truncate" v-text="meal.product.name"></div>
      <div
        class="truncate text-gray-300 italic text-sm"
        v-text="meal.product.tags.join(', ')"
      ></div>
    </div>
    <div class="font-medium">
      <div class="flex items-center justify-end font-mono">
        <div
          :class="meal.featured ? 'text-gray-300 line-through' : ''"
          v-text="$formatCurrency.format(meal.price / 100)"
        ></div>
        <div
          v-if="meal.featured"
          class="px-2 mx-3 rounded text-green-100 bg-green-900"
          v-text="
            `${Math.round(
              ((meal.sale_price - meal.price) / meal.price) * 100
            )}%`
          "
        ></div>
        <div
          v-if="meal.featured"
          v-text="$formatCurrency.format(meal.sale_price / 100)"
        ></div>
        <div
          v-if="meal.graduated_prices"
          class="font-brand uppercase text-xl pl-4"
          :class="{
            'text-brand': meal.graduated_prices.length > 0,
            'opacity-0': meal.graduated_prices.length <= 0
          }"
        >
          <font-awesome-icon
            class="outline-none"
            :class="{
              'cursor-pointer': meal.graduated_prices.length > 0
            }"
            :icon="['fal', 'tags']"
            v-tooltip.bottom-start="graduatedPrices(meal)"
            fixed-width
          ></font-awesome-icon>
        </div>
      </div>
    </div>
    <div>
      <form :id="meal.id" @submit.prevent="addToCart()">
        <div class="flex items-stretch">
          <input
            :aria-label="`Menge für ${meal.product.name}`"
            type="text"
            v-model="amount"
            onkeypress="return (event.charCode !== 8 && event.charCode === 0 || (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 13)"
            placeholder="0"
            class="bg-gray-800 border-gray-800 rounded-lg rounded-r-none focus:border-brand border-r-0 focus:ring-0 text-right w-16"
          />
          <button
            type="submit"
            class="outline-none focus:outline-none text-white rounded-r-lg bg-brand px-2 py-1"
          >
            <font-awesome-icon :icon="['fal', 'cart-plus']"></font-awesome-icon>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meal: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      amount: ""
    };
  },

  methods: {
    graduatedPrices(meal) {
      if (meal.graduated_prices.length <= 0) return;

      let graduatedPrices = "";

      meal.graduated_prices.forEach(graduatedPrice => {
        graduatedPrices += `
            <div class="flex items-center justify-between space-x-16">
              <div>ab ${graduatedPrice.amount} Stück</div>
              <div class="text-right">${this.$formatCurrency.format(
                graduatedPrice.price
              )}</div>
            </div>
          `;
      });

      return `
          <div class="space-y-2 p-2">
            <h2 class="text-brand text-xl font-brand">Staffelpreise bei Bestellungen</h2>
            <div class="space-y-1">
              ${graduatedPrices}
            </div>
          </div>
        `;
    },

    addToCart() {
      let amount = parseInt(this.amount);

      if (isNaN(amount) || amount <= 0) {
        return;
      }

      this.$emit("addToCart", this.meal, amount);

      this.amount = "";
    }
  }
};
</script>
