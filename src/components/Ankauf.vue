<template>
  <div class="mt-8 md:mt-20">
    <h3 class="text-white text-3xl font-brand -mb-1 pl-4">Ankauf</h3>

    <div class="px-4 pt-8 pb-8 bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg">
      <p v-if="isAnkaufActive" class="px-4 text-green-400 mb-8 rounded-lg mx-4 leading-normal flex flex-col md:flex-row items-center">
          <font-awesome-icon :icon="['fad', 'smile-wink']" class="text-4xl mr-4 mb-4 md:mb-0"></font-awesome-icon>
          <span>Du willst etwas verkaufen? Das trifft sich super. Wir sind gerade erreichbar und kaufen dir deine Ware gerne an unserem Lagerhaus ab. Ruf' einfach unter der 1822-44200081 an oder komm direkt vorbei. Den Standort findest du <router-link :to="{name: 'location.warehouse-acquisition'}" class="underline hover:text-brand">hier</router-link>.</span>
      </p>

    <p class="text-gray-100 leading-loose mb-8 text-lg">
      Unten sind die Rohstoffe aufgelistet, welche wir an unserem Lagerhaus zu fairen Preisen ankaufen.
Basierend auf unserem Bedarf an bestimmten Rohstoffen, können die dir angebotenen Konditionen jederzeit variieren.
Damit auch du das meiste aus deiner harten Arbeit rausholen kannst, prüfst du am besten auf dieser Seite unsere aktuellen Konditionen oder kontaktierst uns bei offenen Fragen.
    </p>

    <div class="py-4 md:rounded leading-tight text-gray-100 md:mx-4 my-4 hover:text-underline font-medium flex items-center">
        <font-awesome-icon :icon="['fad', 'info-square']" class="text-2xl text-blue-500 font-medium mr-4"></font-awesome-icon>
        <span class="text-lg">Wir kaufen deine Rohstoffe ausschließlich an unserem Lagerhaus an. Kontaktdaten und Standort findest du <router-link :to="{name: 'location.warehouse-acquisition'}" class="underline hover:text-brand">hier</router-link>.</span>
    </div>

    <div v-if="isLoading" class="w-full text-center mt-16">
      <font-awesome-icon class="text-gray-100 text-3xl" :icon="['fad', 'spinner-third']" spin></font-awesome-icon>
      <div class="font-brand text-gray-300 text-xl mt-4">Lade Ankaufsliste...</div>
    </div>

    <div v-if="! isLoading && hasError" class="w-full text-center mt-16">
      <font-awesome-icon class=" text-red-500 text-3xl" :icon="['fad', 'times-circle']"></font-awesome-icon>
      <div class="font-brand text-red-500 text-xl mt-4">Ankaufsliste nicht verfügbar</div>
    </div>

    <div class="flex items-center justify-center text-gray-400 my-8">
        <font-awesome-icon class="text-red-500 mr-2" :icon="['fad', 'circle']"></font-awesome-icon>
        <div class="mr-4">geringer Bedarf, nur nach Absprache</div>
        <font-awesome-icon class="text-gray-100 mr-2" :icon="['fad', 'circle']"></font-awesome-icon>
        <div class="mr-4">ausreichender Bedarf</div>
        <font-awesome-icon class="text-green-500 mr-2" :icon="['fad', 'circle']"></font-awesome-icon>
        <div>hoher Bedarf</div>
    </div>

    <div class="-mx-4 md:mx-0 mb-8">
        <div>
            <product-aquisition-list :items="highPriorityItems"></product-aquisition-list>
        </div>
    </div>
      <div class="-mx-4 md:mx-0 mb-8">
          <div>
              <product-aquisition-list :items="normalPriorityItems"></product-aquisition-list>
          </div>
      </div>
      <div class="-mx-4 md:mx-0 mb-8">
          <div>
              <product-aquisition-list :items="lowPriorityItems"></product-aquisition-list>
          </div>
      </div>
      <div class="text-gray-500 text-xs text-center mt-4">
          * Bei allen angegebenen Preisen handelt es sich um Bruttopreise.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch("layout/changeLayout", 'restaurant');
    },
    components: {
      ProductAquisitionList: () => import(/* webpackChunkName: "modules/acquisition-product-list" */'./Ankauf/ProductList'),
    },

    mounted() {
        this.loadItems();
    },

    data() {
      return {
        items: [],
        isLoading: true,
        hasError: false,
      }
    },

    computed: {
      highPriorityItems() {
        return this.items.filter(product => product.priority === 'high');
      },

      normalPriorityItems() {
        return this.items.filter(product => product.priority === 'normal');
      },

      lowPriorityItems() {
        return this.items.filter(product => product.priority === 'low');
      },

        isAnkaufActive() {
            return this.$store.getters['service/isAnkaufActive'];
        },
    },

    methods: {
      loadItems() {
        this.$http.get('api/acquisition')
          .then((res) => {
            this.items = res.data;

            this.hasError = false;
            this.isLoading = false;
          })
          .catch(() => {
            this.hasError = true;
            this.isLoading = false;
          });
      }
    }
  }
</script>

<style lang="scss" scoped></style>
