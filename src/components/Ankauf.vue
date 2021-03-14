<template>
  <content-container heading="Ankauf">
    <div
      class="px-4 pt-8 pb-8 bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg"
    >
      <p
        v-if="isAnkaufActive"
        class="px-4 text-green-400 mb-8 rounded-lg mx-4 leading-normal flex flex-col md:flex-row items-center animate__animated animate__pulse animate__infinite animate__slow"
      >
        <font-awesome-icon
          :icon="['fad', 'smile-wink']"
          class="text-4xl mr-4 mb-4 md:mb-0"
        ></font-awesome-icon>
        <span class="text-lg"
          >Du willst etwas verkaufen? Das trifft sich super. Wir sind gerade
          erreichbar und kaufen dir deine Ware gerne an unserem Lagerhaus ab.
          Ruf' einfach unter der 1822-76770759 an und komm' direkt vorbei. Den
          Standort findest du
          <router-link
            :to="{ name: 'location.warehouse-acquisition' }"
            class="underline hover:text-brand"
            >hier</router-link
          >.</span
        >
      </p>

      <p class="text-gray-100 px-4 leading-loose mb-8 text-lg">
        Unten sind die Rohstoffe aufgelistet, welche wir an unserem Lagerhaus zu
        fairen Preisen ankaufen. Basierend auf unserem Bedarf an bestimmten
        Rohstoffen, können die dir angebotenen Konditionen jederzeit variieren.
        Damit auch du das meiste aus deiner harten Arbeit rausholen kannst,
        prüfst du am besten auf dieser Seite unsere aktuellen Konditionen oder
        kontaktierst uns bei offenen Fragen.
      </p>

      <div
        class="py-4 px-4 md:rounded leading-tight text-gray-100 md:mx-4 my-4 hover:text-underline font-medium flex items-center"
      >
        <font-awesome-icon
          :icon="['fad', 'info-square']"
          class="text-2xl text-blue-500 font-medium mr-4"
        ></font-awesome-icon>
        <span class="text-lg"
          >Wir kaufen deine Rohstoffe ausschließlich an unserem Lagerhaus an.
          Kontaktdaten und Standort findest du
          <router-link
            :to="{ name: 'location.warehouse-acquisition' }"
            class="underline hover:text-brand"
            >hier</router-link
          >.</span
        >
      </div>

      <div v-if="isLoading" class="w-full text-center mt-16">
        <font-awesome-icon
          class="text-gray-100 text-3xl"
          :icon="['fad', 'spinner-third']"
          spin
        ></font-awesome-icon>
        <div class="font-brand text-gray-300 text-xl mt-4">
          Lade Ankaufsliste...
        </div>
      </div>

      <div v-if="!isLoading && hasError" class="w-full text-center mt-16">
        <font-awesome-icon
          class=" text-red-500 text-3xl"
          :icon="['fad', 'times-circle']"
        ></font-awesome-icon>
        <div class="font-brand text-red-500 text-xl mt-4">
          Ankaufsliste nicht verfügbar
        </div>
      </div>

      <div class="flex items-center justify-center text-gray-400 my-8">
        <font-awesome-icon
          class="text-red-500 mr-2"
          :icon="['fad', 'circle']"
        ></font-awesome-icon>
        <div class="mr-4">geringer Bedarf</div>
        <font-awesome-icon
          class="text-gray-100 mr-2"
          :icon="['fad', 'circle']"
        ></font-awesome-icon>
        <div class="mr-4">normaler Bedarf</div>
        <font-awesome-icon
          class="text-green-500 mr-2"
          :icon="['fad', 'circle']"
        ></font-awesome-icon>
        <div>hoher Bedarf</div>
      </div>
      <div class="space-y-12" v-if="!isLoading && !hasError">
        <div v-if="highPriorityItems.length > 0" class="-mx-4 md:mx-0">
          <div>
            <product-list :items="highPriorityItems"></product-list>
          </div>
        </div>
        <div v-if="normalPriorityItems.length > 0" class="-mx-4 md:mx-0">
          <div>
            <product-list :items="normalPriorityItems"></product-list>
          </div>
        </div>
        <div
          v-if="lowPriorityItems.length > 0"
          class="-mx-4 md:mx-0 space-y-4"
        >
          <div class="text-red-100 text-lg bg-red-500 bg-opacity-25 px-4 py-3 rounded-none md:rounded-lg flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 items-center">
            <font-awesome-icon
              :icon="['fad', 'exclamation-triangle']"
              class="text-5xl lg:text-3xl text-red-500"
            ></font-awesome-icon>
            <p>
              Die nachfolgenden Rohstoffe benötigen wir aktuell
              <strong>nicht</strong> oder nur
              <strong>in geringen Mengen</strong>. Falls du einen dieser
              Rohstoffe dennoch unbedingt verkaufen möchtest, kaufen wir dir
              diesen auch ab. Bedenke jedoch, dass der von uns gezahlte Preis
              auf Grund unserer <strong>geringen Nachfrage</strong> entsprechend
              <strong>niedriger</strong> ausfällt als üblich.
            </p>
          </div>
          <div>
            <product-list :items="lowPriorityItems"></product-list>
          </div>
        </div>
      </div>
      <div class="text-gray-500 text-xs text-center mt-4">
        * Bei allen angegebenen Preisen handelt es sich um Bruttopreise.
      </div>
    </div>
  </content-container>
</template>

<script>
import ProductList from "@/components/Ankauf/ProductList";
import ContentContainer from "@/components/Common/ContentContainer";

export default {
  components: {
    ProductList,
    ContentContainer
  },

  mounted() {
    this.loadItems();
  },

  data() {
    return {
      items: [],
      isLoading: true,
      hasError: false
    };
  },

  computed: {
    highPriorityItems() {
      return this.items.filter(product => product.priority === "high");
    },

    normalPriorityItems() {
      return this.items.filter(product => product.priority === "normal");
    },

    lowPriorityItems() {
      return this.items.filter(product => product.priority === "low");
    },

    isAnkaufActive() {
      return this.$store.getters["service/isAnkaufActive"];
    }
  },

  methods: {
    loadItems() {
      this.$http
        .get("acquisition")
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
  }
};
</script>

<style lang="scss" scoped></style>
