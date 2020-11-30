<template>
  <div class="mt-8 md:mt-20">
    <h3 class="text-white text-3xl font-brand -mb-1 pl-4">Speisekarte</h3>

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
                <vue-load-image>
                  <img slot="image" :src="meal.product.icon_url" class="h-10 mr-3"  alt=""/>
                  <font-awesome-icon
                    slot="preloader"
                    class="mx-auto text-xl text-gray-400 h-10 mr-3"
                    :icon="['fad', 'spinner-third']"
                    spin
                  ></font-awesome-icon>
                  <font-awesome-icon
                    slot="error"
                    class="mx-auto text-xl text-gray-400 h-10 mr-3"
                    :icon="['fad', 'empty-set']"
                  ></font-awesome-icon>
                </vue-load-image>
                <span class="hidden md:block" v-text="meal.product.name"></span>
              </div>
              <div class="px-2 font-medium">
                <div class="flex justify-end font-mono">
                  <div
                    :class="meal.featured ? 'text-gray-300 line-through' : ''"
                    v-text="formatCurrency(meal.price)"
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
                    v-text="formatCurrency(meal.sale_price)"
                  ></div>
                </div>
              </div>
              <div class="px-2">
                <input
                  :aria-label="`Menge für ${meal.product.name}`"
                  type="number"
                  v-model="meal['amount']"
                  placeholder="0"
                  min="1"
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
              <div class="p-4 flex items-center flex-1">
                <span
                  class="font-light"
                  v-text="`${meal.amount}x ${meal.product.name}`"
                ></span>
              </div>
              <div
                class="font-mono p-4 text-left font-medium"
                v-text="
                  $formatCurrency.format(
                    meal.amount *
                      (meal.featured
                        ? meal.sale_price / 100
                        : meal.price / 100)
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
          <div
            v-if="totalAmount > threshold"
            class="text-red-500 p-3 text-center"
          >
            Puuh, da ist aber jemand hungrig. Bei großen Mengen können wir keine
            sofortige Verfügbarkeit garantieren. Daher solltest du uns zunächst
            kontaktieren.
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
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("layout/changeLayout", "restaurant");

    this.loadItems();

    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  },
  props: {
    threshold: {
      type: Number,
      default: 100
    }
  },

  components: {
    VueLoadImage: () =>
      import(/* webpackChunkName: "modules/vue-load-image" */ "vue-load-image")
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
    formatCurrency(value) {
      return this.formatter.format(value / 100);
    },

    loadItems() {
      this.$http
        .get("api/menu")
        .then(res => {
          this.items = res.data;

          this.hasError = false;
          this.isLoading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.isLoading = false;
        });
    }
  },

  computed: {
    cartItems() {
      return this.items.filter(meal => meal.amount);
    },

    cartEmpty() {
      return this.cartItems.length <= 0;
    },

    totalAmount() {
      let totalAmount = 0;

      this.amounts.forEach(amount => {
        if (!amount || amount <= 0) {
          return false;
        }

        totalAmount += parseInt(amount);
      });

      return totalAmount;
    },

    totalCartAmount() {
      let totalAmount = 0;

      this.cartItems.forEach(meal => {
        if (!meal.amount || meal.amount <= 0) {
          return false;
        }

        totalAmount +=
          meal.amount *
          (meal.featured
            ? meal.sale_price
            : meal.price);
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

      return totalWeight.toFixed(1);
    }
  }
};
</script>

<style lang="scss"></style>
