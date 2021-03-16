<template>
  <div class="w-full md:pt-32">
    <div class="w-full lg:w-2/5">
      <div class="my-16 py-16 md:p-0">
        <h1 class="text-3xl text-gray-100 font-brand text-center mb-2">
          Jetzt Bestellstatus prüfen
        </h1>
        <div class="text-center pt-4 flex items-stretch justify-center lg:justify-end">
          <input
            aria-label="Bestellnummer"
            placeholder="Bestellnummer"
            v-model="orderno"
            type="text"
            class="font-mono text-center w-3/5 bg-gray-900 rounded-l-lg h-16 border-2 border-gray-800 focus:border-2 focus:border-brand text-gray-100 text-xl outline-none border-r-0"
            :class="hasError ? 'border border-red-500' : ''"
          /><button
            :disabled="!orderno"
            aria-label="Bestellstatus prüfen"
            @submit.prevent="checkOrder()"
            @click.prevent="checkOrder()"
            class="bg-brand px-4 h-16 text-white text-xl rounded-r-lg"
          >
            <font-awesome-icon
              v-if="isLoading"
              :icon="['fal', 'spinner-third']"
              spin
            ></font-awesome-icon>
            <font-awesome-icon
              v-else
              :icon="['fal', 'play']"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderno: null,
      order: null,
      isLoading: false,
      hasError: false
    };
  },

  methods: {
    redirect() {
      this.$router.push({
        name: "view-order",
        params: { orderno: this.orderno }
      });
    },

    reset() {
      this.orderno = null;
      this.order = null;
    },

    checkOrder() {
      if (this.order && this.order.orderno === this.orderno) {
        return false;
      }

      this.order = null;
      this.isLoading = true;
      this.hasError = false;

      this.$http
        .post("/api/check-order", { orderno: this.orderno })
        .then(() => {
          this.isLoading = false;
          this.redirect();
        })
        .catch(() => {
          this.isLoading = false;
          this.hasError = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
