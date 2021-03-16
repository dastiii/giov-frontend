<template>
  <div class="mt-8 md:mt-20">
    <div class="flex flex-wrap md:flex-no-wrap justify-between items-end">
      <h3
        class="w-full md:w-auto text-white text-3xl font-brand mb-2 md:-mb-1 pl-4"
      >
        Preisliste
      </h3>
      <div class="w-full md:w-auto flex items-stretch">
        <div
          class="py-4 bg-brand bg-opacity-75 px-4 rounded-none md:rounded-tl"
        >
          <font-awesome-icon
            class="text-white text-lg"
            :icon="['fal', 'search']"
          ></font-awesome-icon>
        </div>
        <input
          class="flex-1 md:flex-auto bg-gray-900 bg-opacity-75 rounded-none md:rounded-tr py-2 px-4 text-gray-100"
          v-model="filter"
          type="text"
          placeholder="Suchen..."
        />
      </div>
    </div>

    <div
      class="px-4 pt-4 pb-8 bg-gray-950 bg-opacity-85 rounded-none md:rounded-lg md:rounded-tr-none"
    >
      <p class="mb-4 text-gray-100 py-4 font-sans leading-loose">
        Hier findest du unsere Gesamtpreisliste. Alle Produkte auf dieser Liste
        können wir dir auf Bestellung frisch zubereiten. Produkte, die wir
        dauerhaft auf Lager haben, findest du dagegen auf unserer Speisekarte.
        Die Lieferzeit kann je nach Auslastung variieren, beläuft sich i.d.R.
        allerdings auf wenige Tage.
      </p>

      <div v-if="isLoading" class="w-full text-center mt-16">
        <font-awesome-icon
          class="text-gray-100 text-3xl"
          :icon="['fal', 'spinner-third']"
          spin
        ></font-awesome-icon>
        <div class="font-brand text-gray-300 text-xl mt-4">
          Lade Preisliste...
        </div>
      </div>

      <div v-if="!isLoading && hasError" class="w-full text-center mt-16">
        <font-awesome-icon
          class=" text-red-500 text-3xl"
          :icon="['fal', 'times-circle']"
        ></font-awesome-icon>
        <div class="font-brand text-red-500 text-xl mt-4">
          Preisliste nicht verfügbar
        </div>
      </div>

      <div
        v-if="filteredMeals.length === 0 && filter"
        class="w-full font-semibold text-center p-4 text-gray-100 text-lg"
      >
        Keine Treffer für den Suchbegriff "<span v-text="filter"></span>".
      </div>

      <div
        v-if="filteredMeals.length > 0 && filter"
        class="w-full font-semibold text-center p-4 text-gray-100 text-lg mb-4"
      >
        <span v-text="filteredMeals.length"></span> Treffer für den Suchbegriff
        "<span v-text="filter"></span>"
      </div>

      <div class="-mx-4 md:mx-0">
        <div class="flex flex-wrap">
          <div
            v-for="(meal) in filteredMeals"
            :key="meal.id"
            class="w-full lg:w-1/2"
          >
            <div class="flex mt-1 md:m-1 bg-gray-900 rounded items-center">
              <div class="flex-1 p-3 flex items-center">
                <img :src="meal.icon_url" class="h-6 mr-2" alt="" />
                <span class="text-gray-100" v-text="meal.name"></span>
              </div>
              <div>
                <div class="flex p-2 justify-end text-gray-100 font-mono">
                  <div
                    :class="
                      meal.menu_item.featured
                        ? 'text-gray-500 line-through'
                        : ''
                    "
                    v-text="$formatCurrency.format(meal.menu_item.price / 100)"
                  ></div>
                  <div
                    v-if="meal.menu_item.featured"
                    class="bg-brand px-2 mx-3 rounded-lg text-gray-100"
                    v-text="
                      `${Math.round(
                        ((meal.menu_item.sale_price - meal.menu_item.price) /
                          meal.menu_item.price) *
                          100
                      )}%`
                    "
                  ></div>
                  <div
                    v-if="meal.menu_item.featured"
                    v-text="
                      $formatCurrency.format(meal.menu_item.sale_price / 100)
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      hasError: false,
      filter: null
    };
  },

  methods: {
    loadItems() {
      this.$http
        .get("prices")
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

    truncate(string) {
      if (string.length >= 18) {
        return string.substring(0, 15) + "...";
      }

      return string;
    }
  },

  computed: {
    filteredMeals() {
      if (!this.filter) {
        return this.items;
      }

      return this.items.filter(meal =>
        meal.name.match(new RegExp(this.filter, "i"))
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
