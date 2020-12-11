<template>
  <vue-load-image class="border-b-8 border-brand mb-6">
    <div
      slot="preloader"
      style="height: 400px;"
      class="w-full bg-gray-900 bg-opacity-50 flex flex-col text-center justify-around"
    >
      <font-awesome-icon
        class="mx-auto text-4xl text-gray-400"
        :icon="['fad', 'spinner-third']"
        spin
      ></font-awesome-icon>
    </div>
    <div
      slot="error"
      style="height: 400px;"
      class="w-full text-gray-300 font-brand text-2xl bg-gray-900 bg-opacity-50 flex flex-col text-center justify-around"
    >
      Bild nicht gefunden.
    </div>
    <img
      slot="image"
      style="height: 400px;"
      class="w-full object-cover rounded-tr-none md:rounded-tr-lg"
      :src="url"
      :alt="alt"
    />
  </vue-load-image>
</template>

<script>
import VueLoadImage from "vue-load-image";

export default {
  name: "LocationImageWrapper",
  props: {
    url: {
      required: true,
      type: String
    },
    alt: {
      required: true,
      type: String
    }
  },
  components: {
    VueLoadImage
  }
};
</script>

<style scoped></style>
