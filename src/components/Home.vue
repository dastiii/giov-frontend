<template>
  <div class="w-full md:pt-32">
    <div class="w-full lg:w-2/5">
      <div class="my-16 py-16 md:p-0">
        <h1 class="text-3xl text-gray-100 font-brand text-center mb-2">
          Jetzt Bestellstatus prüfen
        </h1>
        <div>
          <form @submit.prevent="checkOrder()">
            <div class="text-center pt-4 flex items-stretch justify-center lg:justify-end">
              <input
                aria-label="Bestellnummer"
                placeholder="Bestellnummer"
                v-model="orderno"
                type="text"
                :class="{ 'border-red-500 focus:border-red-500': hasError, 'border-gray-800 focus:border-brand': !hasError }"
                class="focus:ring-0 font-mono text-center w-3/5 bg-gray-900 rounded-l-lg h-16 border-2 focus:border-r-0
                 text-gray-100 text-xl outline-none border-r-0"
              />
              <button
                :disabled="!orderno"
                aria-label="Bestellstatus prüfen"
                @click.prevent="checkOrder()"
                class="bg-brand border-2 border-brand focus:ring-0 focus:outline-none focus:border-white px-4 h-16 text-white text-xl rounded-r-lg"
              >
                <font-awesome-icon
                  v-if="isLoading"
                  :icon="['fal', 'spinner-third']"
                  spin
                  fixed-width
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  :icon="['fal', 'play']"
                  fixed-width
                ></font-awesome-icon>
              </button>
            </div>
          </form>
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
        .post("check-order", { orderno: this.orderno })
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
