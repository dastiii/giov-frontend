<template>
  <content-container heading="Deine Bestellung">
    <div class="px-4 pt-4 bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg">
      <div
        v-if="isLoading"
        class="container text-gray-100 text-center mx-auto my-16"
      >
        <font-awesome-icon
          class="text-4xl text-center"
          :icon="['fal', 'spinner-third']"
          spin
        ></font-awesome-icon>
        <div class="text-2xl font-brand mt-4">
          Deine Bestellung wird abgerufen...
        </div>
      </div>

      <div
        v-if="!isLoading && hasError"
        class="container text-red-500 text-center mx-auto my-16"
      >
        <font-awesome-icon
          class="text-4xl text-center"
          :icon="['fal', 'times-circle']"
        ></font-awesome-icon>
        <div class="text-2xl font-brand mt-4">
          Ups, da ist etwas schiefgelaufen. Bitte probiere es später erneut.
        </div>
      </div>

      <div class="container mx-auto" v-if="order">
        <div class="px-4 mt-16 mb-8 text-gray-100">
          <div class="flex flex-wrap justify-between">
            <div
              class="w-full md:w-1/4 mb-8 md:mb-0 flex md:flex-col justify-between"
            >
              <div class="flex-1 md:flex-initial text-center">
                <font-awesome-icon
                  class="mb-2 text-4xl"
                  :icon="['fal', 'file-contract']"
                ></font-awesome-icon>
                <p>Auftrag bestätigt</p>
              </div>
              <div class="hidden h-4 md:flex mt-8">
                <div class="w-1/2 rounded-l-lg bg-brand"></div>
                <div
                  class="w-1/2"
                  :class="order.confirmed ? 'bg-brand' : 'bg-gray-800'"
                ></div>
              </div>
              <div class="text-center mt-6">
                <font-awesome-icon
                  v-if="order.confirmed"
                  class="text-2xl text-brand"
                  :icon="['fal', 'check-circle']"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  class="text-2xl"
                  :icon="['fal', 'spinner-third']"
                  spin
                ></font-awesome-icon>
              </div>
            </div>
            <div
              class="w-full md:w-1/4 mb-8 md:mb-0 flex md:flex-col justify-between"
            >
              <div class="flex-1 md:flex-initial text-center">
                <font-awesome-icon
                  class="mb-2 text-4xl"
                  :icon="['fal', 'hat-chef']"
                ></font-awesome-icon>
                <p>Wird zubereitet</p>
              </div>
              <div class="hidden h-4 md:flex mt-8">
                <div
                  class="w-1/2"
                  :class="order.confirmed ? 'bg-brand' : 'bg-gray-800'"
                ></div>
                <div
                  class="w-1/2"
                  :class="
                    order.confirmed && order.in_production
                      ? 'bg-brand'
                      : 'bg-gray-800'
                  "
                ></div>
              </div>
              <div class="text-center mt-6">
                <font-awesome-icon
                  v-if="order.confirmed && order.in_production"
                  class="text-2xl text-brand"
                  :icon="['fal', 'check-circle']"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else-if="order.confirmed"
                  class="text-2xl"
                  :icon="['fal', 'spinner-third']"
                  spin
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  class="text-2xl"
                  :icon="['fal', 'circle']"
                ></font-awesome-icon>
              </div>
            </div>
            <div
              class="w-full md:w-1/4 mb-8 md:mb-0 flex md:flex-col justify-between"
            >
              <div class="flex-1 md:flex-initial text-center">
                <font-awesome-icon
                  class="mb-2 text-4xl"
                  :icon="['fal', 'truck-loading']"
                ></font-awesome-icon>
                <p>Bereit zur Auslieferung</p>
              </div>
              <div class="hidden h-4 md:flex mt-8">
                <div
                  class="w-1/2"
                  :class="
                    order.confirmed && order.in_production
                      ? 'bg-brand'
                      : 'bg-gray-800'
                  "
                ></div>
                <div
                  class="w-1/2"
                  :class="
                    order.confirmed &&
                    order.in_production &&
                    order.ready_for_delivery
                      ? 'bg-brand'
                      : 'bg-gray-800'
                  "
                ></div>
              </div>
              <div class="text-center mt-6">
                <font-awesome-icon
                  v-if="
                    order.confirmed &&
                      order.in_production &&
                      order.ready_for_delivery
                  "
                  class="text-2xl text-brand"
                  :icon="['fal', 'check-circle']"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else-if="order.confirmed && order.in_production"
                  class="text-2xl"
                  :icon="['fal', 'spinner-third']"
                  spin
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  class="text-2xl"
                  :icon="['fal', 'circle']"
                ></font-awesome-icon>
              </div>
            </div>
            <div
              class="w-full md:w-1/4 mb-8 md:mb-0 flex md:flex-col justify-between"
            >
              <div class="flex-1 md:flex-initial text-center">
                <font-awesome-icon
                  class="mb-2 text-4xl"
                  :icon="['fal', 'box-check']"
                ></font-awesome-icon>
                <p>Abgeschlossen</p>
              </div>
              <div class="hidden h-4 md:flex mt-8">
                <div
                  class="w-1/2"
                  :class="
                    order.confirmed &&
                    order.in_production &&
                    order.ready_for_delivery
                      ? 'bg-brand'
                      : 'bg-gray-800'
                  "
                ></div>
                <div
                  class="w-1/2 rounded-r-lg"
                  :class="
                    order.confirmed &&
                    order.in_production &&
                    order.ready_for_delivery &&
                    order.delivered &&
                    order.completed
                      ? 'bg-brand'
                      : 'bg-gray-800'
                  "
                ></div>
              </div>
              <div class="text-center mt-6">
                <font-awesome-icon
                  v-if="
                    order.confirmed &&
                      order.in_production &&
                      order.ready_for_delivery &&
                      order.delivered &&
                      order.completed
                  "
                  class="text-2xl text-brand"
                  :icon="['fal', 'check-circle']"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else-if="
                    order.confirmed &&
                      order.in_production &&
                      order.ready_for_delivery
                  "
                  class="text-2xl"
                  :icon="['fal', 'spinner-third']"
                  spin
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  class="text-2xl"
                  :icon="['fal', 'circle']"
                ></font-awesome-icon>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center text-gray-100 mb-8">
          <h2 class="text-gray-400 text-sm uppercase">Aktueller Status</h2>
          <h3 class="text-xl mt-2" v-if="!order.confirmed">
            Angebot erstellt, warte auf Beauftragung
          </h3>
          <h3
            class="text-xl mt-2"
            v-else-if="order.confirmed && !order.in_production"
          >
            Gerichte werden frisch zubereitet
          </h3>
          <h3
            class="text-xl mt-2"
            v-else-if="
              order.confirmed &&
                order.in_production &&
                !order.ready_for_delivery
            "
          >
            Bestellung wird für die Auslieferung vorbereitet
          </h3>
          <h3
            class="text-xl mt-2"
            v-else-if="
              order.confirmed &&
                order.in_production &&
                order.ready_for_delivery &&
                !order.delivered
            "
          >
            Bestellung ist bereit zur Auslieferung
          </h3>
          <h3
            class="text-xl mt-2"
            v-else-if="
              order.confirmed &&
                order.in_production &&
                order.ready_for_delivery &&
                order.delivered &&
                !order.completed
            "
          >
            Bestellung wurde ausgeliefert
          </h3>
          <h3
            class="text-xl mt-2"
            v-else-if="
              order.confirmed &&
                order.in_production &&
                order.ready_for_delivery &&
                order.delivered &&
                order.completed
            "
          >
            Bestellung komplett abgeschlossen
          </h3>
        </div>

        <div>
          <table class="w-full">
            <thead>
              <tr class="text-xs text-gray-400 uppercase text-right">
                <td></td>
                <td class="py-3">Menge</td>
                <td class="py-3">Einzelpreis</td>
                <td class="py-3 pr-2">Gesamtpreis</td>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-gray-100 even:bg-gray-950 odd:bg-gray-900"
                v-for="item in order.products"
                :key="item.id"
              >
                <td class="flex items-center py-4 pl-2">
                  <img class="h-6 mr-2" :src="item.icon_url" alt="" />
                  <span v-text="item.name"></span>
                </td>
                <td
                  class="text-right py-4 font-mono"
                  v-text="item.pivot.quantity"
                ></td>
                <td
                  class="text-right py-4 font-mono"
                  v-text="$formatCurrency.format(item.pivot.price / 100)"
                ></td>
                <td
                  class="text-right py-4 pr-2 font-mono"
                  v-text="
                    $formatCurrency.format(
                      (item.pivot.quantity * item.pivot.price) / 100
                    )
                  "
                ></td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t-4 border-double border-brand text-gray-100">
                <td
                  class="py-3 pl-2 text-gray-400 font-mono"
                  v-text="`Gewicht: ${totalWeight}kg`"
                ></td>
                <td></td>
                <td></td>
                <td
                  class="py-3 pr-2 text-right font-mono"
                  v-text="$formatCurrency.format(totalAmount / 100)"
                ></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="text-center text-2xl text-gray-100 font-brand py-12">
          <p>
            Vielen Dank für deine Bestellung,<br />
            wir wünschen <span class="text-brand">guten Appetit!</span>
          </p>
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

  mounted() {
    this.fetchOrder();
  },

  data() {
    return {
      order: null,
      isLoading: true,
      hasError: false
    };
  },

  watch: {
    $route() {
      if (!this.order || this.$route.params.orderno !== this.order.orderno) {
        this.fetchOrder();
      }
    }
  },

  computed: {
    totalAmount() {
      let total = 0;

      this.order.products.forEach(product => {
        total += product.pivot.price * product.pivot.quantity;
      });

      return total;
    },

    totalWeight() {
      let total = 0;

      this.order.products.forEach(product => {
        total += product.pivot.quantity * product.weight;
      });

      return this.$formatWeight.format(total);
    }
  },

  methods: {
    fetchOrder() {
      if (!this.$route.params.orderno) {
        return false;
      }

      this.order = null;
      this.isLoading = true;
      this.hasError = false;

      this.$http
        .post("/api/orders", { orderno: this.$route.params.orderno })
        .then(res => {
          this.order = res.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.hasError = true;
        });
    }
  }
};
</script>
