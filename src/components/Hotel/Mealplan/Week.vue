<template>
  <div class="mt-12 mb-8 flex justify-around">
    <div
      v-if="isLoading || hasError || data[week].length === 0"
      class="bg-gray-950 py-4 px-8 rounded-lg w-1/3"
    >
      <div v-if="isLoading" class="w-full text-center my-16">
        <font-awesome-icon
          class="text-gray-100 text-3xl"
          :icon="['fad', 'spinner-third']"
          spin
        ></font-awesome-icon>
        <div class="font-brand-hotel text-gray-300 text-xl mt-4">
          Lade Speiseplan...
        </div>
      </div>

      <div v-else-if="!isLoading && hasError" class="w-full text-center my-16">
        <font-awesome-icon
          class=" text-red-500 text-3xl"
          :icon="['fad', 'times-circle']"
        ></font-awesome-icon>
        <div class="font-brand-hotel text-red-500 text-xl mt-4">
          Speiseplan konnte nicht geladen werden, versuche es später erneut.
        </div>
      </div>

      <div
        v-else-if="!isLoading && !hasError && data[week].length === 0"
        class="w-full text-center my-16"
      >
        <font-awesome-icon
          class=" text-red-500 text-3xl"
          :icon="['fad', 'times-circle']"
        ></font-awesome-icon>
        <div class="font-brand-hotel text-red-500 text-xl mt-4">
          Kein Speiseplan verfügbar, melde dich bitte beim Betreiber.
        </div>
      </div>
    </div>

    <div
      v-if="!hasError && !isLoading && data[week].length > 0"
      class="w-full flex flex-wrap items-stretch"
    >
      <mealplan-list
        v-for="day in data[week]"
        :key="day.id"
        :day="day"
      ></mealplan-list>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    week: {
      required: true
    }
  },

  components: {
    MealplanList: () =>
      import(
        /* webpackChunkName: "modules/mealplan-list" */ "./MealplanList"
      )
  },

  created() {
    this.load();
  },

  data() {
    return {
      data: {},
      hasError: false,
      isLoading: true
    };
  },

  computed: {
    currentWeek() {
      if (this.week === "next-week") {
        return "Nächste Woche";
      }

      if (this.week === "last-week") {
        return "Letzte Woche";
      }

      return "Diese Woche";
    }
  },

  methods: {
    load() {
      if (this.data[this.week]) {
        // 'this.week's data has already been loaded - skip fetching it again.
        return;
      }

      this.isLoading = true;
      this.hasError = false;

      this.$http
        .get(`/api/mealplans?week=${this.week}`)
        .then(res => {
          this.data[this.week] = res.data;

          this.hasError = false;
          this.isLoading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.isLoading = false;
        });
    }
  },

  watch: {
    $route() {
      this.load();
    }
  }
};
</script>

<style scoped></style>
