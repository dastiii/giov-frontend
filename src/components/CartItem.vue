<template>
  <div
    class="text-gray-100 bg-gray-900 border-b-2 border-gray-950 flex justify-between items-center first:rounded-t-lg space-x-4 px-2 py-2 "
  >
    <img class="h-8" :src="meal.product.icon_url" alt="" />
    <div class="flex-col items-center flex-1 min-w-0">
      <div class="flex items-center space-x-2">
        <div v-if="isGraduated" class="text-brand font-semibold italic" v-tooltip.bottom-start="'Staffelpreis ist aktiv'">
          <font-awesome-icon :icon="['fal', 'tags']"></font-awesome-icon>
        </div>
        <div class="truncate" v-text="meal.product.name"></div>
      </div>
      <div class="font-light uppercase text-sm text-gray-300 flex items-center space-x-2">
        <div>
          Menge:
          <span class="font-semibold text-gray-100" v-text="amount"></span>
        </div>
        <div>
          <v-popover
            offset="4"
            placement="bottom-start"
            :autoHide="true"
            @hide="newAmount = ''"
            @show="focus(`cart-amount-${meal.id}`)"
          >
            <button class="focus:outline-none focus:text-brand">
              <font-awesome-icon
                :icon="['fal', 'pencil']"
                class="tooltip-target b3">
              </font-awesome-icon>
            </button>

            <template slot="popover">
              <form @submit.prevent="updateAmount">
                <div>
                  <div class="flex items-stretch">
                    <input
                      :ref="`cart-amount-${meal.id}`"
                      type="text"
                      v-model="newAmount"
                      :placeholder="amount"
                      onkeypress="return (event.charCode !== 8 && event.charCode === 0 || (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 13)"
                      :id="`cart-amount-${meal.id}`"
                      :name="`cart-amount-${meal.id}`"
                      class="bg-gray-950 border-0 rounded-lg rounded-r-none focus:border-brand border-r-0 focus:ring-0 text-right w-32"
                    />
                    <button
                      type="submit"
                      class="outline-none border-0 focus:outline-none text-white rounded-r bg-brand px-2 py-1"
                    >
                      <font-awesome-icon
                        :icon="['fal', 'save']">
                      </font-awesome-icon>
                    </button>
                  </div>
                </div>
              </form>
            </template>
          </v-popover>
        </div>
        <button
          @click="$emit('removeFromCart', meal)"
          class="focus:outline-none focus:text-red-200"
        >
          <font-awesome-icon :icon="['fal', 'times']"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div
      class="font-mono text-left font-medium"
      v-text="$formatCurrency.format(currentPrice / 100 * amount)"
    ></div>
  </div>
</template>

<script>
import { reject, maxBy } from 'lodash';

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
  },

  data() {
    return {
      newAmount: "",
      isGraduated: false,
      currentPrice: null,
    };
  },

  created() {
    this.calculatePrice();

    this.$emit("updateAmount", this.meal, this.amount, this.currentPrice);
  },

  watch: {
    amount() {
      this.calculatePrice();

      this.$emit("updateAmount", this.meal, this.amount, this.currentPrice);
    },
  },

  methods: {
    calculateGraduatedPrice() {
      let graduatedPrices = this.meal.graduated_prices;

      if (graduatedPrices.length <= 0) {
        return false;
      }

      graduatedPrices = reject(graduatedPrices, graduatedPrice => graduatedPrice.amount > this.amount);

      if (graduatedPrices.length <= 0) {
        return false;
      }

      const graduatedPrice = maxBy(graduatedPrices, graduatedPrice => graduatedPrice.amount);

      return graduatedPrice.price;
    },

    calculatePrice() {
      this.isGraduated = false;

      const graduatedPrice = this.calculateGraduatedPrice();
      const currentPrice = this.meal.featured
          ? this.meal.sale_price
          : this.meal.price;

      if (graduatedPrice !== false) {
        const graduated = graduatedPrice * 100;

        if (graduated >= currentPrice) {
          this.currentPrice = currentPrice;

          return;
        }

        this.currentPrice = graduated;
        this.isGraduated = true;

        return;
      }

      this.currentPrice = currentPrice;
    },

    updateAmount() {
      if (this.newAmount === "") {
        return;
      }

      this.$emit('updateAmount', this.meal, parseInt(this.newAmount));
      this.newAmount = "";
    },

    focus(ref) {
      console.log(this.$refs[ref]);

      this.$nextTick(() => this.$refs[ref].focus());
    }
  }
};
</script>
