<template>
  <content-container heading="Speisekarte">
    <div
      class="flex flex-wrap lg:flex-no-wrap w-full bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg"
    >
      <div class="w-full lg:w-8/12 p-4">
        <p class="text-lg text-gray-100 py-4 px-4 font-sans leading-loose">
          Unten findest du eine Auswahl an Getränken und Speisen, die wir
          täglich frisch zubereiten und für dich und deinen Hunger in unserem
          Restaurant zum Verzehr bereithalten. Du hättest gerne etwas
          <b>spezielles</b> oder benötigst <b>große Mengen</b>? Dann kontaktiere
          uns zunächst und wir besprechen die Details!
        </p>

        <div
          class="md:ml-2 py-4 px-4 md:rounded text-lg leading-tight text-gray-100 my-4 hover:text-underline font-medium flex items-center"
        >
          <font-awesome-icon
            :icon="['fad', 'info-square']"
            class="text-2xl text-blue-500 font-medium mr-4"
          ></font-awesome-icon>
          <span
            >Du suchst mehr?
            <router-link
              :to="{ name: 'prices' }"
              class="underline hover:text-brand"
              >Hier</router-link
            >
            geht's zu unserer vollständigen Preisliste.</span
          >
        </div>

        <div v-if="isLoading" class="w-full text-center mt-16">
          <font-awesome-icon
            class="text-gray-100 text-3xl"
            :icon="['fad', 'spinner-third']"
            spin
          ></font-awesome-icon>
          <div class="font-brand text-gray-300 text-xl mt-4">
            Lade Speisekarte...
          </div>
        </div>

        <div v-if="!isLoading && hasError" class="w-full text-center mt-16">
          <font-awesome-icon
            class=" text-red-500 text-3xl"
            :icon="['fad', 'times-circle']"
          ></font-awesome-icon>
          <div class="font-brand text-red-500 text-xl mt-4">
            Speisekarte nicht verfügbar
          </div>
        </div>

        <div class="mt-8">
          <div v-if="items.length > 0">
            <div
              class="flex items-center odd:bg-gray-900 even:bg-gray-950 text-gray-100 first:rounded-t-lg last:rounded-b-lg"
              v-for="meal in items"
              :key="meal.id"
            >
              <div class="p-2 py-3 flex-1 flex items-center">
                <img :src="meal.product.icon_url" class="h-10 mr-3" alt="" />
                <span class="hidden md:block" v-text="meal.product.name"></span>
              </div>
              <div class="px-2 font-medium">
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
                    class="font-brand uppercase px-2 text-xl"
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
                      :icon="['fad', 'tags']"
                      v-tooltip.bottom-start="graduatedPrices(meal)"
                      fixed-width
                    ></font-awesome-icon>
                  </div>
                </div>
              </div>
              <div class="px-2">
                <input
                  :aria-label="`Menge für ${meal.product.name}`"
                  type="number"
                  v-model="meal['amount']"
                  placeholder="0"
                  min="1"
                  max="9999"
                  class="bg-gray-800 w-16 py-1 px-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full lg:w-4/12 p-2 lg:p-4 bg-gray-900 md:rounded-r-lg bg-opacity-50"
      >
        <div class="sticky top-16 pt-2">
          <h3 class="pl-2 md:pl-0 text-white text-2xl font-brand mb-4">
            Deine Auswahl
          </h3>

          <div
            v-if="cartItems.length <= 0"
            class="md:rounded-lg bg-gray-900 p-4 text-gray-300"
          >
            Du hast noch keine Produkte ausgewählt
          </div>

          <div v-else>
            <div
              class="text-gray-100 bg-gray-900 border-b-2 border-gray-950 flex justify-between items-center first:rounded-t-lg"
              v-for="meal in cartItems"
              :key="meal.id"
            >
              <img class="ml-4 h-8" :src="meal.product.icon_url" alt="" />
              <div class="p-4 flex-col items-center flex-1 min-w-0">
                <div class="truncate" v-text="meal.product.name"></div>
                <div class="font-light uppercase text-sm text-gray-300">
                  Menge:
                  <span
                    class="font-semibold text-gray-100"
                    v-text="meal.amount"
                  ></span>
                </div>
              </div>
              <div
                class="font-mono p-4 text-left font-medium"
                v-text="
                  $formatCurrency.format(
                    meal.amount *
                      (meal.featured ? meal.sale_price / 100 : meal.price / 100)
                  )
                "
              ></div>
            </div>
          </div>

          <div v-if="cartItems.length > 0">
            <div
              class="p-3 pr-4 pt-2 pb-0 text-right text-gray-100 font-medium border-t-4 border-brand border-double"
            >
              in bar zu entrichten:
              <span
                class="font-mono"
                v-text="$formatCurrency.format(totalCartAmount / 100)"
              ></span>
            </div>

            <div
              class="p-3 pr-4 pt-0 text-right text-gray-500"
              v-text="`Gewicht: ${totalCartWeight}kg`"
            ></div>
          </div>
          <div class="mt-8">
            <p class="text-gray-300 p-4 font-sans">
              Damit du auch genau weißt, wie viel Bargeld du mitbringen musst,
              kannst du hier eine Vorauswahl mit deinen gewünschten Mengen
              treffen und du bekommst Preis und Gewicht sofort ausgerechnet.
            </p>
            <p
              class="text-right font-brand text-2xl p-4 pl-8 text-brand font-medium italic"
            >
              So einfach war es noch nie!
            </p>
          </div>
        </div>
      </div>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from "@/components/Common/ContentContainer";

export default {
  components: {
    ContentContainer
  },

  created() {
    this.loadItems();
  },
  props: {
    threshold: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      amounts: [],
      items: [],
      isLoading: true,
      hasError: false
    };
  },

  methods: {
    loadItems() {
      this.$http
        .get("menu")
        .then(res => {
          this.items = res.data;

          this.hasError = false;
          this.isLoading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.isLoading = false;
        });
    },

    graduatedPrices(meal) {
      if (meal.graduated_prices.length <= 0) return;

      let graduatedPrices = "";

      meal.graduated_prices.forEach(graduatedPrice => {
        graduatedPrices += `
          <div class="flex items-center justify-between space-x-16">
            <div>ab ${graduatedPrice.amount} Stück</div>
            <div class="text-right">${this.$formatCurrency.format(graduatedPrice.price)}</div>
          </div>
        `;
      });

      return `
        <div class="space-y-2 p-2">
          <h2 class="text-brand text-xl font-brand">Staffelpreise</h2>
          <div class="space-y-1">
            ${graduatedPrices}
          </div>
        </div>
      `;
    }
  },

  computed: {
    cartItems() {
      return this.items.filter(meal => meal.amount);
    },

    cartEmpty() {
      return this.cartItems.length <= 0;
    },

    totalCartAmount() {
      let totalAmount = 0;

      this.cartItems.forEach(meal => {
        if (!meal.amount || meal.amount <= 0) {
          return false;
        }

        totalAmount +=
          meal.amount * (meal.featured ? meal.sale_price : meal.price);
      });

      return totalAmount;
    },

    totalCartWeight() {
      let totalWeight = 0;

      this.cartItems.forEach(meal => {
        if (!meal.amount || meal.amount <= 0) {
          return false;
        }

        totalWeight += meal.amount * meal.product.weight;
      });

      return this.$formatWeight.format(totalWeight);
    }
  }
};
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  @apply bg-black bg-opacity-50 text-white rounded px-2 py-1;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
